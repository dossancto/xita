<script setup lang="ts">
import AppSidebar from '~/components/shared/sidebar/AppSidebar.vue';
import AppSidebarItemButton from '~/components/shared/sidebar/AppSidebarItemButton.vue';
import AppSidebarItemLink from '~/components/shared/sidebar/AppSidebarItemLink.vue';

</script>


<template>
  <AppSidebar>
    <AppSidebarItemLink to="/">
      <UIcon name="lucide:house" size="24" />
    </AppSidebarItemLink>

    <AppSidebarItemLink to="/trips">
      <UIcon name="lucide:car" size="24" />
    </AppSidebarItemLink>
  </AppSidebar>
</template>
