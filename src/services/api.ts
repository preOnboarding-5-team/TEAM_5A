/* eslint-disable consistent-return */
import axios from 'axios';

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

// const SEARCH_DISEASES_BASE_URL = `${PROXY}/B551182/diseaseInfoService/getDissNameCodeList`;
const SEARCH_DISEASES_BASE_URL = 'ec2-18-207-186-148.compute-1.amazonaws.com:8080';

interface Params {
  searchText: string;
}

export const getSearchDiseasesAPI = async (params: Params) => {
  // const { data } = await axios.get<IDiseaseAPIRes>(`${SEARCH_DISEASES_BASE_URL}`, {
  //   params: {
  //     ServiceKey: process.env.REACT_APP_GET_DISS_API_KEY,
  //     ...params,
  //     _type: 'json',
  //     numOfRows: 2000,
  //     sickType: 1,
  //     medTp: 2,
  //     diseaseType: 'SICK_NM',
  //   },
  // });

  const { data } = await axios.get<IDiseaseAPIRes>(SEARCH_DISEASES_BASE_URL);

  const item = data.response.body?.items?.item;
  if (item === undefined) return;
  if (item instanceof Array) return item;
  return [item];
};

export const getAllDiseasesApi = async () => {
  // const { data } = await axios.get<IDiseaseAPIRes>(`${SEARCH_DISEASES_BASE_URL}`, {
  //   params: {
  //     _type: 'json',
  //     ServiceKey: process.env.REACT_APP_GET_DISS_API_KEY,
  //     numOfRows: 2000,
  //     sickType: 1,
  //     medTp: 2,
  //     diseaseType: 'SICK_NM',
  //   },
  // });

  const { data } = await axios.get<IDiseaseAPIRes>(SEARCH_DISEASES_BASE_URL);

  const item = data.response.body?.items?.item;
  if (item === undefined) return;
  if (item instanceof Array) return item;
  return [item];
};
