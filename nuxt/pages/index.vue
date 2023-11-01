<script setup lang="ts">
definePageMeta({
  title: "home",
})

interface Entry {
  path: string
  icon: string
}

const entries: Entry[] = [
]
</script>

<template>
  <div>
    <h1 style="font-size: 1.6em">
      {{ $t("common.appName") }}
    </h1>
    <v-list class="mt-4">
      <v-list-item
        v-for="entry in entries"
        :key="entry.path"
        :prepend-icon="entry.icon"
        :title="getPageTitle(entry.path)"
        :to="localePath(entry.path)"
      />
    </v-list>
  </div>
</template>

<style scoped>

</style>
