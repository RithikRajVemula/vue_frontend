<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="text-start">
        <h1
          class="my-6"
          style="color: #196ca2; font-style: italic; font-variant: small-caps"
        >
          {{ pageTitle }}
        </h1>
      </v-col>
    </v-row>
    <v-row v-if="resumes.length !== 0">
      <v-col v-for="(resume,index) in resumes" :key="resume.id" cols="12">
        <v-card class="mx-auto pa-4 pb-2" elevation="4" outlined>
          <v-row>
            <v-col cols="10">
              <h3> Resume {{ index+1 }}</h3>
            </v-col>
            <v-col cols="2" class="text-end">
              <!-- Edit Button -->
              <v-icon @click="editResume(resume.id)" class="mx-2"
                >mdi-pencil</v-icon
              >
              <!-- Delete Button -->
              <v-icon @click="confirmDelete(resume.id)" class="mx-2"
                >mdi-delete</v-icon
              >
              <!-- View Button -->
              <v-icon @click="viewResume(resume.id)" class="mx-2"
                >mdi-eye</v-icon
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- Dialog for Delete Confirmation -->
    <v-dialog v-model="dialogDelete" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this resume?
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="dialogDelete = false">Cancel</v-btn>
          <v-btn
            color="error"
            @click="deleteResume"
            :loading="deleteLoading"
            :disabled="deleteLoading"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ResumeServices from "../services/ResumeServices";
import { updateSnackBar } from "../utils/utils";
import PdfServices from '../services/PdfServices';

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const resumes = ref([]);
const dialogDelete = ref(false);
const deleteLoading = ref(false);
let resumeToDeleteId = null;
const user = ref(null);
const isAdmin = ref(false);
const pageTitle = ref("");

const fetchResumes = async () => {
  try {
    const localUser = localStorage.getItem("user");
    user.value = JSON.parse(localUser);
    // Check if the user is an admin
    if (
      user.value &&
      user.value.is_admin &&
      router.currentRoute.value.name === "all-resumes"
    ) {
      isAdmin.value = true;
      pageTitle.value = "All Resumes";
      // Fetch all resumes for admin
      const response = await ResumeServices.getAllResumes();
      resumes.value = response.data;
    } else {
      isAdmin.value = false;
      pageTitle.value = "My Resumes";
      // Fetch resumes for the current user
      const response = await ResumeServices.getResumeByUserId(user.value.id);
      resumes.value = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "Failed to fetch resumes!",
      "error"
    );
  }
};

const editResume = (id) => {
  router.push({
    name: isAdmin.value ? "edit-resume-details" : "edit-resume-details",
    params: { id },
  });
};


const viewResume = (id) => {
  router.push({
    name: isAdmin.value ? "view-resume-details" : "view-resume-details",
    params: { id },
  });
};

const confirmDelete = (id) => {
  resumeToDeleteId = id;
  dialogDelete.value = true;
};

const deleteResume = async () => {
  if (!resumeToDeleteId) return;

  try {
    deleteLoading.value = true;
    await ResumeServices.deleteResume(resumeToDeleteId);
    // Remove the deleted resume from the list
    resumes.value = resumes.value.filter(
      (resume) => resume.id !== resumeToDeleteId
    );
    snackbar.value = updateSnackBar("Resume deleted successfully.", "success");
  } catch (error) {
    console.error("Failed to delete resume:", error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "Failed to delete resume!",
      "error"
    );
  } finally {
    deleteLoading.value = false;
    dialogDelete.value = false;
    resumeToDeleteId = null;
  }
};

onMounted(fetchResumes);
</script>
