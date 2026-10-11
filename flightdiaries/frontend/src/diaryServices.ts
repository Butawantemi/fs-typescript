import axios from "axios";
import { type DiaryEntry, type NewDairy } from "./type";
const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

const create = (object: NewDairy) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data);
};

export default { getAll, create };
