import instance from "./instance";

export const getCommentByVideo = (id) => {
  const url = "/comment/get-comment/" + id;
  return instance.get(url);
};

export const getCountComments = (id) => {
  const url = "/comment/get-count-comment/" + id;
  return instance.get(url);
};

export const getCountDeletedComments = (id) => {
  const url = "/comment/get-count-deleted-comment/" + id;
  return instance.get(url);
};

export const postComment = (data) => {
  const url = "/comment/post-comment";
  return instance.post(url, data);
};

export const updateComment = (id, data) => {
  const url = "/comment/update-comment/" + id;
  return instance.put(url, data);
};

export const deleteComment = (id) => {
  const url = "/comment/delete-comment/" + id;
  return instance.delete(url);
};
