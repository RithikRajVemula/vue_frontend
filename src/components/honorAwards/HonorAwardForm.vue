<template>
  <div>
    <h3>{{ editMode ? "Edit Award" : "Add Award" }}</h3>
    <v-form ref="form" @submit.prevent="save">
        <v-row>
          <v-col cols="12">
            <v-text-field
            variant="outlined"
              v-model="localHonorAward.title"
              label="Title"
              required
            ></v-text-field>
          </v-col>
        <v-col cols="12">
            <v-textarea
            variant="outlined"
              color="primary"
              v-model="localHonorAward.information"
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
  honorAward: {
    type: Object,
    required: true,
  },
});
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});
const localHonorAward = ref({ ...props.honorAward });
const editMode = ref(!!props.honorAward.id);
const emit = defineEmits(["save"]);

// Watch for changes in props.honorAward
watchEffect(() => {
  localHonorAward.value = { ...props.honorAward };
  editMode.value = props.honorAward?.id || null;
});

const save = () => {
  if (!localHonorAward.value.title || !localHonorAward.value.information) {
    snackbar.value = updateSnackBar('Please fill in all required fields.', 'error');
  } else {
  console.log("Save:", localHonorAward.value);
  emit("save", localHonorAward.value);
  localHonorAward.value = { ...props.honorAward };
  }
};
</script>
