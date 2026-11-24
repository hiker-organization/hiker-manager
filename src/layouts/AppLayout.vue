<template>
  <div class="relative size-full flex">
    <Sidebar />
    <main class="h-full min-w-0 flex-1 bg-base-100 pb-4">
      <div class="size-full overflow-x-hidden pt-4 pl-4 pr-4 overflow-y-auto md:pl-24">
        <RouterView />
      </div>
    </main>
  </div>
</template>
