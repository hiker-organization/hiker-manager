<template>
  <div
    class="size-full grid grid-cols-1 grid-rows-[repeat(4, auto)] gap-4 md:grid-cols-2 md:grid-rows-[repeat(3, auto)] lg:grid-rows-[repeat(2, auto)]"
  >
    <UsersModuleSummaryCardsContainer />

    <UsersModuleSummaryChart />

    <div class="col-span-full lg:col-span-1">
      <UsersMostReportedChart />
    </div>

    <div class="col-span-full lg:col-span-1">
      <UsersWithMostBlockedReviewsChart />
    </div>
  </div>
</template>
