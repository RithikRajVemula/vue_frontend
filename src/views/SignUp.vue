<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import Snackbar from "../components/snackbar/Snack.vue";
import { updateSnackBar } from "../utils/utils";

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  phone_number: "",
  address: "",
  linkedin_url: "",
  portfolio: "",
  professional_summary: "",
  is_admin: false,
});
const visible = ref(false);
const step = ref(1);

onMounted(() => {
  if (localStorage.getItem("user") !== null) {
    router.push({ name: "home" });
  }
});

function validateStep1() {
  return (
    user.value.first_name.length > 0 &&
    user.value.last_name.length > 0 &&
    user.value.email.length > 0 &&
    user.value.password.length > 0
  );
}

function validateStep2() {
  return (
    user.value.phone_number.length > 0 &&
    user.value.address.length > 0
  );
}

function nextStep() {
  if (step.value === 1 && validateStep1()) {
    step.value = 2;
  } else {
    snackbar.value = updateSnackBar("Please fill in all fields", "error");
  }
}

function previousStep() {
  if (step.value === 2) {
    step.value = 1;
  }
}

async function signup() {
  try {
    if (validateStep1() && validateStep2()) {
      const { data } = await UserServices.signup(user.value);
      window.localStorage.setItem("user", JSON.stringify(data));
      snackbar.value = updateSnackBar("Signup successful!", "green");
      router.push({ name: "home" });
    } else {
      snackbar.value = updateSnackBar("Please fill in all fields", "error");
    }
  } catch (error) {
    console.log(error);
    snackbar.value = updateSnackBar(
      error?.response?.data?.message || "Signup failed!",
      "error"
    );
  }
}
</script>

<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h2 class="my-6" style="color:#196CA2;">Resume Generation</h2>
      </v-col>
    </v-row>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <template v-if="step === 1">
        <div class="text-subtitle-1 text-medium-emphasis">First Name</div>
        <v-text-field
          v-model="user.first_name"
          density="compact"
          placeholder="First Name"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Last Name</div>
        <v-text-field
          v-model="user.last_name"
          density="compact"
          placeholder="Last Name"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
        <v-text-field
          v-model="user.email"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Password</div>
        <v-text-field
          v-model="user.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="nextStep">
          Next
        </v-btn>
      </template>

      <template v-if="step === 2">
        <div class="text-subtitle-1 text-medium-emphasis">Phone Number</div>
        <v-text-field
          v-model="user.phone_number"
          density="compact"
          placeholder="Phone Number"
          prepend-inner-icon="mdi-phone-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Address</div>
        <v-text-field
          v-model="user.address"
          density="compact"
          placeholder="Address"
          prepend-inner-icon="mdi-home-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">LinkedIn URL</div>
        <v-text-field
          v-model="user.linkedin_url"
          density="compact"
          placeholder="LinkedIn URL"
          prepend-inner-icon="mdi-linkedin"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Portfolio</div>
        <v-text-field
          v-model="user.portfolio"
          density="compact"
          placeholder="Portfolio"
          prepend-inner-icon="mdi-web"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Professional Summary</div>
        <v-textarea
          v-model="user.professional_summary"
          density="compact"
          placeholder="Professional Summary"
          variant="outlined"
        ></v-textarea>
        
        <v-row class="mb-8">
          <v-col>
            <v-btn color="grey" size="large" variant="tonal" block @click="previousStep">
              Back
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="blue" size="large" variant="tonal" block @click="signup">
              Sign Up
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="/signin" rel="noopener noreferrer">
          Already have account? <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
    <Snackbar :snackbar="snackbar" />
  </div>
</template>
