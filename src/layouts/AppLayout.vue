<template>
  <div class="relative size-full flex">
    <Sidebar />
    <main class="h-full min-w-0 flex-1 bg-base-100 py-4 pl-24 pr-4">
      <div class="size-full overflow-x-hidden overflow-y-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>
