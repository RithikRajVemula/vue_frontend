<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="text-start">
        <h1
          class="my-6"
          style="color: #196ca2; font-style: italic; font-variant: small-caps"
        >
          Create Resume
        </h1>
      </v-col>
    </v-row>
    <Resume :resumeDetails="resumeDetails" @save="createResume" />
    <Snackbar :snackbar="snackbar" />
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import Resume from "../components/Resume/Resume.vue";
import ResumeServices from "../services/ResumeServices";
import Snackbar from "../components/snackbar/Snack.vue";
import { updateSnackBar } from "../utils/utils";

const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const resumeDetails = ref({
  userDetails: JSON.parse(localStorage.getItem("user")) || {
    first_name: "",
    last_name: "",
    email: "",
  },
  education: [],
  experiences: [],
  projects: [],
  resumeSkills: [],
  extraCurricular: [],
  honorAwards: [],
});

const createResume = async () => {
  // Logic to create resume and make API call
  ResumeServices.addResume({
    ...resumeDetails.value,
    userId: resumeDetails.value.userDetails.id,
  })
    .then((res) => {
      console.log(res);
      snackbar.value = updateSnackBar("Resume Created Successfully", "success");
    })
    .catch((err) => {
      console.log(err);
      snackbar.value = updateSnackBar(
        err?.response?.data?.message || "Failed to create Resume!",
        "error"
      );
    });
};
</script>
