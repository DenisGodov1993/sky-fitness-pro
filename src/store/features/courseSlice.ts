// import { FitCourse } from '@/sharedTypes/sharedTypes';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type initialStateType = {
//   currentCourse: null | FitCourse;
// };

// const initialState: initialStateType = {
//     currentCourse: null,
// };

// const courseSlice = createSlice({
//   name: 'courses',
//   initialState,
//   reducers: {
//     setCurrentCourse: (state, action: PayloadAction<FitCourse>) => {
//         state.currentCourse = action.payload;
//     },
//   },
// });

// export const { setCurrentCourse } = courseSlice.actions;
// export const courseSliceReducer = courseSlice.reducer;




import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FitCourse } from '@/sharedTypes/sharedTypes';
// import { getNextOrPrevTrack } from '@/utils/getNextOrPrevTrack';

export type SortType = 'default' | 'author' | 'year_new' | 'year_old';

export type initialStateType = {
  currentCourse: FitCourse | null;
  isPlay: boolean;
  playlist: FitCourse[];
  shuffledPlaylist: FitCourse[];
  allTracks: FitCourse[];
  favoriteTracks: FitCourse[];
  isShuffle: boolean;
  fetchError: null | string;
  fetchIsLoading: boolean;
  pagePlaylist: FitCourse[];
  filteredTracks: FitCourse[];
  filters: {
    authors: string[];
    genres: string[];
    years: string[];
    search: string;
    sort: SortType;
  };
};

const initialState: initialStateType = {
  currentCourse: null,
  isPlay: false,
  playlist: [],
  shuffledPlaylist: [],
  allTracks: [],
  favoriteTracks: [],
  isShuffle: false,
  fetchError: null,
  fetchIsLoading: true,
  pagePlaylist: [],
  filteredTracks: [],
  filters: {
    authors: [],
    genres: [],
    years: [],
    search: '',
    sort: 'default',
  },
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCurrentCourse: (state, action: PayloadAction<FitCourse>) => {
      state.currentCourse = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setCurrentPlaylist: (state, action: PayloadAction<FitCourse[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    // setNextTrack: (state) => {
    //   const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
    //   state.currentCourse = getNextOrPrevTrack(list, state.currentCourse, 'next');
    // },
    // setPrevTrack: (state) => {
    //   const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
    //   state.currentCourse = getNextOrPrevTrack(list, state.currentCourse, 'prev');
    // },
    setAllTracks: (state, action: PayloadAction<FitCourse[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<FitCourse[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<FitCourse>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<number>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (t) => t.id !== action.payload,
      );
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    // setPagePlaylist: (state, action: PayloadAction<FitCourse[]>) => {
    //   state.pagePlaylist = action.payload;
    //   state.filteredTracks = applyFilters(state);
    // },
    // setFilterAuthors: (state, action: PayloadAction<string>) => {
    //   const author = action.payload;
    //   state.filters.authors = state.filters.authors.includes(author)
    //     ? state.filters.authors.filter((a) => a !== author)
    //     : [...state.filters.authors, author];
    //   state.filteredTracks = applyFilters(state);
    // },
    // setFilterGenres: (state, action: PayloadAction<string>) => {
    //   const genre = action.payload;
    //   state.filters.genres = state.filters.genres.includes(genre)
    //     ? state.filters.genres.filter((g) => g !== genre)
    //     : [...state.filters.genres, genre];
    //   state.filteredTracks = applyFilters(state);
    // },
    // setSearch: (state, action: PayloadAction<string>) => {
    //   state.filters.search = action.payload;
    //   state.filteredTracks = applyFilters(state);
    // },
    // setSort: (state, action: PayloadAction<SortType>) => {
    //   state.filters.sort = action.payload;
    //   state.filteredTracks = applyFilters(state);
    // },
    // resetFilters: (state) => {
    //   state.filters = {
    //     authors: [],
    //     genres: [],
    //     search: '',
    //     years: [],
    //     sort: 'default',
    //   };
    //   state.filteredTracks = state.pagePlaylist;
    // },
  },
});

export const {
  setCurrentCourse,
  setIsPlay,
  setCurrentPlaylist,
  // setNextTrack,
  // setPrevTrack,
  toggleShuffle,
  setAllTracks,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setFetchError,
  setFetchIsLoading,
  // setPagePlaylist,
  // setFilterAuthors,
  // setFilterGenres,
  // setSearch,
  // setSort,
  // resetFilters,
} = courseSlice.actions;

export const courseSliceReducer = courseSlice.reducer;
