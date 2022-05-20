import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { IItem } from 'types/search'

import type { RootState } from '.'

export interface DiseaseState {
  diseaseList: IItem[]
}

const INITIAL_STATE: DiseaseState = {
  diseaseList: [],
}

const diseaseListSlice = createSlice({
  name: 'diseaseList',
  initialState: INITIAL_STATE,
  reducers: {
    setDisease: (state: DiseaseState, action: PayloadAction<IItem[]>) => {
      state.diseaseList = action.payload
    },
  },
})

export const { setDisease } = diseaseListSlice.actions

export default diseaseListSlice.reducer

// Selector =====================

export const getDisease = (state: RootState) => state.diseaseList.diseaseList
