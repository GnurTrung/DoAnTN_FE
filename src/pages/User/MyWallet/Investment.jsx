import Image from "components/ProgressiveImage";
import React from "react";
import DefaultAvatar from "assets/images/author/default-avatar.png";

const Investment = () => {
  return (
    <div className="flex flex-col">
      <div>
        <div>
          <Image src={DefaultAvatar} alt="Avatar" />
        </div>
      </div>
    </div>
  );
};

export default Investment;
