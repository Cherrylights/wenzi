import { PREV_PROJECT, NEXT_PROJECT } from "../constants/actionTypes";

export const prevProject = () => ({
  type: PREV_PROJECT
});

export const nextProject = () => ({
  type: NEXT_PROJECT
});
