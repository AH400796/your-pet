export const selectNotices = store => store.notices.items;
export const selectIsLoading = store => store.notices.isLoading;
export const selectError = store => store.notices.error;
export const selectTotalPages = store => store.notices.totalPages;
export const selectCategory = store => store.notices.searchParams.category;
export const selectMale = store => store.notices.searchParams.genderMale;
export const selectFemale = store => store.notices.searchParams.genderFemale;
export const selectUpToOneYearAge = store => store.notices.searchParams.upToOneYearAge;
export const selectOneYearAge = store => store.notices.searchParams.oneYearAge;
export const selectFromTwoYearsAge = store => store.notices.searchParams.fromTwoYearsAge;