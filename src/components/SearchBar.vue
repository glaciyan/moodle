<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps<{ modelValue: string; placeholder?: string }>();
defineEmits(["update:modelValue"]);

const input = ref<HTMLInputElement>();
onMounted(() => {
  input.value?.focus();
});
</script>

<template>
  <div
    class="bg-slate-100 dark:bg-neutral-700/80 py-2 px-4 rounded-lg shadow my-4 focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-neutral-500 transition-shadow dark:text-neutral-200"
  >
    <input
      ref="input"
      class="w-full bg-transparent focus:outline-none dark:placeholder:text-neutral-500"
      :placeholder="placeholder ?? 'Suche...'"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as any).value)"
    />
  </div>
</template>
