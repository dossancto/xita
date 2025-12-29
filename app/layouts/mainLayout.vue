<script setup lang="ts">
import AppSidebar from '~/components/shared/sidebar/AppSidebar.vue';
import AppSidebarItemLink from '~/components/shared/sidebar/AppSidebarItemLink.vue';
</script>

<template>
  <div>
    <main>
      <slot />
    </main>
    <aside>
      <AppSidebar>
        <AppSidebarItemLink to="/" :currentPath="$route.path">
          <UIcon name="lucide:house" size="24" />
        </AppSidebarItemLink>

        <AppSidebarItemLink to="/trips" :currentPath="$route.path">
          <UIcon name="lucide:car" size="24" />
        </AppSidebarItemLink>
      </AppSidebar>
    </aside>
  </div>
</template>
