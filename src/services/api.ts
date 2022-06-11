/* eslint-disable consistent-return */
import axios from 'axios';

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const SEARCH_DISEASES_BASE_URL = `${PROXY}/B551182/diseaseInfoService/getDissNameCodeList`;

interface Params {
  searchText: string;
}

export const getSearchDiseasesAPI = async (params: Params) => {
  const { data } = await axios.get<IDiseaseAPIRes>(`${SEARCH_DISEASES_BASE_URL}`, {
    params: {
      ServiceKey: process.env.REACT_APP_GET_DISS_API_KEY,
      ...params,
      _type: 'json',
      numOfRows: 2000,
      sickType: 1,
      medTp: 2,
      diseaseType: 'SICK_NM',
    },
  });

  const item = data.response.body?.items?.item;
  if (item === undefined) return;
  if (item instanceof Array) return item;
  return [item];
};

export const getAllDiseasesApi = async () => {
  const { data } = await axios.get<IDiseaseAPIRes>(`${SEARCH_DISEASES_BASE_URL}`, {
    params: {
      _type: 'json',
      numOfRows: 2000,
      ServiceKey: process.env.REACT_APP_GET_DISS_API_KEY,
    },
  });

  const item = data.response.body?.items?.item;
  if (item === undefined) return;
  if (item instanceof Array) return item;
  return [item];
};
