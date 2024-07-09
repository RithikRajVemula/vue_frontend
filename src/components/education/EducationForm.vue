<template>
  <div>
    <h3>{{ editMode ? "Edit Education" : "Add Education" }}</h3>
    <v-form ref="form" @submit.prevent="save" v-model="validForm">
        <v-row>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              v-model="localEducation.university_name"
              label="University Name (required)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              v-model="localEducation.course"
              label="Course (required)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              v-model="localEducation.specialization"
              label="Specialization"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              v-model="localEducation.gpa"
              label="GPA"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              v-model="localEducation.location"
              label="Location (required)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              color="primary"
              v-model="localEducation.from_date"
              label="From Date (required)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              color="primary"
              v-model="localEducation.to_date"
              label="To Date"
            ></v-text-field>
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
import { updateSnackBar } from '../../utils/utils';
import Snackbar from "../snackbar/Snack.vue"

const props = defineProps({
  education: {
    type: Object,
    required: true,
  },
});
const validForm = ref(false);
const localEducation = ref({ ...props.education });
const editMode = ref(!!props.education.id);
const emit = defineEmits(["save"]);
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});

// Watch for changes in props.education
watchEffect(() => {
  localEducation.value = { ...props.education };
  editMode.value = props.education?.id || null;
});

const save = () => {
  if (!localEducation.value.university_name || !localEducation.value.course || !localEducation.value.location || !localEducation.value.from_date) {
    snackbar.value = updateSnackBar('Please fill in all required fields.', 'error');
  } else {
    console.log('Save:', localEducation.value);
    emit('save', localEducation.value);
    localEducation.value = { ...props.education };
  }
};
</script>
