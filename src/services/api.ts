/* eslint-disable consistent-return */
import axios from 'axios';

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const SEARCH_DISEASES_BASE_URL = `${PROXY}/B551182/diseaseInfoService/getDissNameCodeList`;

// interface Params {
//   searchText: string;
// }

export const getSearchDiseasesAPI = async () => {
  const { data } = await axios.get<IDiseaseAPIRes>(`${SEARCH_DISEASES_BASE_URL}`, {
    params: {
      ServiceKey: process.env.REACT_APP_GET_DISS_API_KEY,
      diseaseType: 'SICK_NM',
      numOfRows: 2000,
      sickType: 1,
      medTp: 2,
      _type: 'json',
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
      ServiceKey: process.env.REACT_APP_DISEASES_ID,
    },
  });

  const item = data.response.body?.items?.item;
  if (item === undefined) return;
  if (item instanceof Array) return item;
  return [item];
};
