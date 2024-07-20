// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";

// import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// import Tooltip from "@mui/material/Tooltip";
// import IconButton from "@mui/material/IconButton";

// import { LiaComment } from "react-icons/lia";
// import { CiShare2 } from "react-icons/ci";
// import { CiSaveDown2 } from "react-icons/ci";
// import { BiUpvote } from "react-icons/bi";
// import { BiSolidUpvote } from "react-icons/bi";
// import { BiDownvote } from "react-icons/bi";
// import { BiSolidDownvote } from "react-icons/bi";

// import "./post.scss";

// const Post = ({ data }) => {
//   const { content, caption } = data;

//   const [thumbsSwiper, setThumbsSwiper] = useState(null);


//   const renderContent = (content, index) => {
//     switch (content.mediaType) {
//       case "video":
//         return (
//           <video key={index} controls src={content.url} className="mediaFile" />
//         );
//       case "audio":
//         return (
//           <audio key={index} controls src={content.url} className="mediaFile" />
//         );
//       case "image":
//         return (
//           content.url && (
//             <img
//               key={index}
//               src={content.url}
//               alt={`Content ${index}`}
//               className="mediaFile"
//             />
//           )
//         );

//       default:
//         return null;

//       // default:
//       //   return (
//       //     <div id="paraPost">
//       //       <p key={index}>{content.text}</p>
//       //     </div>
//       //   );
//     }
//   };

//   // Filter content to check if there are any media files
//   const mediaContent = content.filter(
//     (cont) => cont.type === "video" || cont.type === "audio" || cont.type === "image"
//   );

//   return (
//     { data?<div className = "post">
//       < div id = "carouselPost" >
//   {
//     data.mediaFiles.length && (
//       <Swiper effect={"cards"} grabCursor={true} className="mySwiper">
//         {data.mediaFiles.map((cont, index) => (
//           <SwiperSlide key={index}>
//             {renderContent(cont, index)}
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     )
//   }
//       </ >
//   <div id="captionAndOptions">
//     <div id="options">
//       {content[0].src && (
//         <img src={content[0].src} alt="Profile" />
//       )}
//       <div>John Doe</div>
//       <span id="behold">behold</span>
//       <span id="behold">chum request</span>
//     </div>
//     <div className="caption">
//       {caption && (
//         <div>
//           <p>
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
//             non quisquam adipisci. Lorem ipsum dolor, sit amet consectetur
//             adipisicing elit. Recusandae, praesentium. Adipisci, minus
//             ratione? Nesciunt nam explicabo similique perspiciatis sint.
//             Odit cumque nulla est repellendus rerum! Soluta odio unde
//             inventore aspernatur commodi repellat at reiciendis voluptatem
//             vero ullam rem cupiditate recusandae modi molestias sequi
//           </p>
//         </div>
//       )}
//     </div>
//     <div id="options2">
//       <div id="left">
//         <Tooltip title="Comment">
//           <IconButton>
//             <LiaComment size={30} style={{ color: "white" }} />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Share">
//           <IconButton>
//             <CiShare2 size={30} style={{ color: "white" }} />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Save">
//           <IconButton>
//             <CiSaveDown2 size={30} style={{ color: "white" }} />
//           </IconButton>
//         </Tooltip>
//       </div>
//       <div id="right">
//         <Tooltip title="upvote">
//           <IconButton>
//             <BiUpvote size={30} style={{ color: "white" }} />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="downvote">
//           <IconButton>
//             <BiDownvote size={30} style={{ color: "white" }} />
//           </IconButton>
//         </Tooltip>
//       </div>
//     </div>
//     <div id="bottomPost">
//       <span>shared with you and 10 others on 2:30 pm</span>
//     </div>
//   </div>
//     </div >
//   ): <h1>No new posts</h1>}
// };

// export default Post;

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { LiaComment } from "react-icons/lia";
import { CiShare2 } from "react-icons/ci";
import { CiSaveDown2 } from "react-icons/ci";
import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import "./post.scss";

const Post = ({ data }) => {
  const { mediaFiles, caption } = data;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const renderContent = (content, index) => {
    switch (content.mediaType) {
      case "video":
        return (
          <video key={index} controls src={content.url} className="mediaFile" />
        );
      case "audio":
        return (
          <audio key={index} controls src={content.url} className="mediaFile" />
        );
      case "image":
        return (
          content.url && (
            <img
              key={index}
              src={content.url}
              alt={`Content ${index}`}
              className="mediaFile"
            />
          )
        );
      default:
        return null;
    }
  };

  return data ? (
    <div className="post">
      <div id="carouselPost">
        {mediaFiles.length > 0 && (
          <Swiper effect={"cards"} grabCursor={true} className="mySwiper">
            {mediaFiles.map((file, index) => (
              <SwiperSlide key={index}>
                {renderContent(file, index)}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div id="captionAndOptions">
        <div id="options">
          {mediaFiles[0]?.url && (
            <img src={mediaFiles[0].url} alt="Profile" />
          )}
          <div>John Doe</div>
          <span id="behold">behold</span>
          <span id="behold">chum request</span>
        </div>
        <div className="caption">
          {caption && (
            <div>
              <p>{caption}</p>
            </div>
          )}
        </div>
        <div id="options2">
          <div id="left">
            <Tooltip title="Comment">
              <IconButton>
                <LiaComment size={30} style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share">
              <IconButton>
                <CiShare2 size={30} style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton>
                <CiSaveDown2 size={30} style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div id="right">
            <Tooltip title="upvote">
              <IconButton>
                <BiUpvote size={30} style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="downvote">
              <IconButton>
                <BiDownvote size={30} style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div id="bottomPost">
          <span>shared with you and 10 others on 2:30 pm</span>
        </div>
      </div>
    </div>
  ) : (
    <h1>No posts</h1>
  );
};

export default Post;

