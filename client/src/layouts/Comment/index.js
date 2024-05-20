import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames/bind";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import "moment/locale/vi";
import moment from "moment";
import Wrapper from "../../components/Popper";
import {
  postComment,
  getCommentByVideo,
  updateComment,
  deleteComment,
  getCountComments,
  getCountDeletedComments,
} from "../../redux/service/comment";
import styles from "./Comment.module.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
const cs = classNames.bind(styles);

function Comment({ videoId }) {
  moment.locale("vi");

  const [cmtId, setCmtId] = useState();
  const [menu, setMenu] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [countComment, setCountComment] = useState(0);
  const [countDeletedComment, setCountDeletedComment] = useState(0);
  const [showUpdateBtn, setShowUpdateBtn] = useState(null);
  const { showToastMessage } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchComments = async (videoId) => {
    try {
      const response = await getCommentByVideo(videoId);
      setComments(response.data.filter((data) => data.userId));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const countComments = async (videoId) => {
    try {
      const count = await getCountComments(videoId);
      setCountComment(count.counts);
    } catch (error) {
      console.error("Error Count Comment: ", error);
    }
  };

  const countDeletedComments = async (videoId) => {
    try {
      const count = await getCountDeletedComments(videoId);
      setCountDeletedComment(count.counts);
    } catch (error) {
      console.error("Error get count deleted commennt :", error);
    }
  };

  useEffect(() => {
    // Lấy danh sách bình luận khi videoId thay đổi
    if (videoId) {
      countComments(videoId);
      countDeletedComments(videoId);
      fetchComments(videoId);
    }
  }, [videoId]);

  // post cmt
  const handleCommentSubmit = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để bình luận.");
      return;
    }
    if (!commentText.trim()) {
      alert("Vui lòng nhập nội dung bình luận.");
      return;
    }
    try {
      await postComment({
        userId: user._id,
        videoId,
        content: commentText,
      });
      // Sau khi đăng bình luận thành công, cập nhật danh sách bình luận
      countComments(videoId);
      countDeletedComments(videoId);
      fetchComments(videoId);
      showToastMessage("success", "Bình luận thành công");

      // Xóa nội dung của ô nhập bình luận
      setCommentText("");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Đã có lỗi xảy ra khi đăng bình luận. Vui lòng thử lại sau.");
    }
  };

  //update
  const handleUpdateContent = async (id, content) => {
    const elementContent = document.getElementById(id);
    if (content != elementContent.innerText) {
      try {
        await updateComment(id, { content: elementContent.innerText });
        fetchComments(videoId);
        setShowUpdateBtn(null);
        showToastMessage("success", "Cập nhật thành công");
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowUpdateBtn(null);
    }
  };

  const handleCancle = (id, content) => {
    const elementContent = document.getElementById(id);
    elementContent.innerText = content;
    setShowUpdateBtn(null);
  };
  //delete

  const handleDeleteCmt = async (id) => {
    try {
      await deleteComment(id);
      countComments(videoId);
      countDeletedComments(videoId);
      fetchComments(videoId);
      showToastMessage("success", "Đã xóa thành công");
      // if (id == showUpdateBtn) setShowUpdateBtn(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cs("comment")}>
      <div className={cs("contentBox")}>
        {user ? (
          <form
            className={cs("form")}
            onSubmit={(e) => {
              e.preventDefault();
              handleCommentSubmit();
            }}
            style={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <img src={user.avatar} alt="" className={cs("avatarImg")} />
            <input
              type="text"
              className={cs("InputComment")}
              placeholder="Nhập bình luận..."
              required={true}
              onInvalid={(e) =>
                e.target.setCustomValidity("Hãy nhập bình luận của bạn")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              value={commentText}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!inputValue.startsWith(" ")) {
                  setCommentText(e.target.value);
                }
              }}
            />
            <button className={cs("btnSend")}>Đăng</button>
          </form>
        ) : (
          <h2 className={cs("textNote")}>
            Bạn cần <Link to="/signin">đăng nhập </Link> để bình luận
          </h2>
        )}
      </div>

      {comments.length < 1 ? (
        <h2
          style={{ textAlign: "center", color: "#fe2c55", marginTop: "100px" }}
        >
          Hiện chưa có bình luận nào
        </h2>
      ) : (
        <>
          <div
            className={cs("total-comment")}
          >{`${countComment} Bình luận`}</div>
          <ul className={cs("containComment")}>
            {comments &&
              comments.map((comment, index) => (
                <li key={index} className={cs("commentItem")}>
                  <div className={cs("avatar")}>
                    <img
                      src={comment.userId.avatar}
                      alt=""
                      className={cs("avatarImg")}
                    />
                  </div>
                  <div
                    className={cs("comment-wrap")}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div className={cs("commentItem-wrap")}>
                      <h4>
                        {comment.userId.firstName} {comment.userId.lastName}
                      </h4>
                      <p
                        className={cs("contentComment")}
                        contentEditable={comment._id == showUpdateBtn}
                        suppressContentEditableWarning={true}
                        id={comment._id}
                        style={
                          comment._id == showUpdateBtn
                            ? {
                                borderBottom: "2px solid #2b71f5",
                                outline: "none",
                                padding: "5px 0px ",
                              }
                            : {}
                        }
                      >
                        {comment.content}
                      </p>
                      {comment._id == showUpdateBtn && (
                        <button
                          className={cs("closeBtn")}
                          onClick={() =>
                            handleCancle(comment._id, comment.content)
                          }
                        >
                          Hủy
                        </button>
                      )}

                      {comment._id == showUpdateBtn && (
                        <button
                          className={cs("editBtn")}
                          onClick={() =>
                            handleUpdateContent(comment._id, comment.content)
                          }
                        >
                          Cập nhật
                        </button>
                      )}
                    </div>
                    <div className={cs("timeAndEdited")}>
                      <span className={cs("timeComment")}>
                        {moment(comment.createdAt)
                          .fromNow()
                          .replace("vài giây trước", "vừa xong")}
                      </span>
                      {comment.isEdited && <span>(đã chỉnh sửa)</span>}
                    </div>
                  </div>
                  {user && comment.userId._id == user._id && (
                    <div>
                      <Tippy
                        interactive
                        visible={menu && comment._id == cmtId}
                        placement="bottom"
                        render={(attrs) => (
                          <div
                            className={cs("moreOptions")}
                            tabIndex="-1"
                            {...attrs}
                          >
                            <Wrapper className={cs("menu-popper")}>
                              <button
                                className={cs("btn")}
                                onClick={() => {
                                  setMenu(false);
                                  setShowUpdateBtn(comment._id);
                                }}
                              >
                                <FontAwesomeIcon
                                  className={cs("faOption")}
                                  icon={faPencil}
                                />
                                Chỉnh sửa
                              </button>
                              <button
                                onClick={() => {
                                  setMenu(false);
                                  handleDeleteCmt(comment._id);
                                }}
                                className={cs("btn")}
                              >
                                <FontAwesomeIcon
                                  className={cs("faOption")}
                                  icon={faTrashCan}
                                />
                                Xóa
                              </button>
                            </Wrapper>
                          </div>
                        )}
                        onClickOutside={() => setMenu(false)}
                      >
                        <div className={cs("iconOption")}>
                          <i
                            onClick={() => {
                              setMenu((menu) => !menu);
                              setCmtId(comment._id);
                            }}
                          >
                            <FontAwesomeIcon
                              className={cs("ellipsisIcon")}
                              icon={faEllipsis}
                            />
                          </i>
                        </div>
                      </Tippy>
                    </div>
                  )}
                </li>
              ))}
          </ul>
          <div className={cs("total-deleted-comment")}>
            {countDeletedComment > 0 && (
              <span>{`(${countDeletedComment} Bình luận đã bị xóa)`}</span>
            )}
          </div>
          <h4 className={cs("noMore")}>Đã hết kết quả</h4>
        </>
      )}
    </div>
  );
}

export default Comment;
