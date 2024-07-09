<template>
  <div>
    <h3>{{ editMode ? "Edit Experience" : "Add Experience" }}</h3>
    <v-form ref="form" @submit.prevent="save">
        <v-row>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              v-model="localExperience.employer"
              label="Employer Name (required)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              v-model="localExperience.position"
              label="Position (required)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              v-model="localExperience.location"
              label="Location (required)"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              color="primary"
              v-model="localExperience.from_date"
              label="From Date (required)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              color="primary"
              v-model="localExperience.to_date"
              label="To Date"
            ></v-text-field>
          </v-col>
        <v-col cols="12">
            <v-textarea
            variant="outlined"
              color="primary"
              v-model="localExperience.information"
              label="Information (required)"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn color="primary" @click="save">Save</v-btn>
        </v-row>
    </v-form>
    <Snackbar :snackbar="snackbar" />
  </div>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits } from "vue";
import Snackbar from "../snackbar/Snack.vue"
import { updateSnackBar } from '../../utils/utils';

const props = defineProps({
  experience: {
    type: Object,
    required: true,
  },
});

const localExperience = ref({ ...props.experience });
const editMode = ref(!!props.experience.id);
const emit = defineEmits(["save"]);
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});

// Watch for changes in props.experience
watchEffect(() => {
  localExperience.value = { ...props.experience };
  editMode.value = props.experience?.id || null;
});

const save = () => {
  if (!localExperience.value.employer || !localExperience.value.position || !localExperience.value.location || !localExperience.value.from_date || !localExperience.value.information) {
    snackbar.value = updateSnackBar('Please fill in all required fields.', 'error');
  } else {
  console.log("Save:", localExperience.value);
  emit("save", localExperience.value);
  localExperience.value = { ...props.experience };
  }
};
</script>
