import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { moviesService } from './movies-service'

export const getMovies = createAsyncThunk(
  'movie/getmovies',
  async (_, thunk) => {
    const data = await moviesService.getMovies()

    if (data.status === ('fail' || 'error')) {
      return thunk.rejectWithValue(data.message)
    }

    return thunk.fulfillWithValue(data)
    // return data
  }
)

export const getMovie = createAsyncThunk(
  'movie/getMovie',
  async (movieId, thunk) => {
    const data = await moviesService.getMovie(movieId)

    // console.log(data)

    if (data.status === ('fail' || 'error')) {
      return thunk.rejectWithValue(data.message)
    }

    // return data
    return thunk.fulfillWithValue(data)
  }
)

export const createMovies = createAsyncThunk(
  'movie/create',
  async (movieData, thunk) => {
    const token = thunk.getState().auth.user.token
    const user = thunk.getState().auth.user
    // console.log(user)
    const data = await moviesService.createMovies(movieData, token)

    console.log(data)
    if (data.status === ('fail' || 'error')) {
      // console.log(data.message)
      return thunk.rejectWithValue(data.message)
    }

    // console.log(data)

    // return data
    return thunk.fulfillWithValue(data)
  }
)

const initialState = {
  movie: {},
  movies: [],
  loading: true,
  isSuccess: true,
  isError: false,
  message: ''
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    reset: (state) => {
      state.movie = {}
      state.movies = []
      state.loading = true
      state.isSuccess = true
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload
        state.loading = false
        state.isSuccess = true
        state.isError = false
        state.message = ''
      })
      .addCase(getMovie.pending, (state) => {
        state.loading = true
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.loading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.loading = false
        state.isError = false
        state.isSuccess = true
        state.movie = action.payload
      })
      .addCase(createMovies.pending, (state) => {
        state.loading = true
      })
      .addCase(createMovies.rejected, (state, action) => {
        state.loading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(createMovies.fulfilled, (state, action) => {
        state.loading = false
        state.isError = false
        state.isSuccess = true
        state.movie = action.payload
      })
  }
})

export const { reset } = moviesSlice.actions
export default moviesSlice.reducer
