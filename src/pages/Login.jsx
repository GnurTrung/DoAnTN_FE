import { Button } from "antd";
import { useWeb3 } from "contexts/useWeb3Context";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getUserPro5, updateUserPro5 } from "services/user";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import Meta from "components/Meta";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Explore = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const { account } = useWeb3();
  const [data, setData] = useState({});
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const [fileList, setFileList] = useState([]);
  const uploadButton = (
    <div>
      <PlusOutlined style={{ color: "white" }} />
      <div
        style={{
          marginTop: 8,
          color: "white",
        }}
      >
        Upload
      </div>
    </div>
  );

  const getData = async () => {
    const res = await getUserPro5({ address: account });
    if (res.data) setData(res.data);
  };
  useEffect(() => {
    getData();
  }, [account]);
  
  const handleSave = async () => {
    const dataProfile = {
      // name: document.getElementById("profile-username").value,
      // // avatarUrl: document.getElementById("profile-image").value,
      // twitterUrl: document.getElementById("profile-tw").value,
      // discordUrl: document.getElementById("profile-dc").value,
      // websiteUrl: document.getElementById("profile-ws").value,
    };
    const res = await updateUserPro5({
      address: account,
      options: dataProfile,
    });
    toast.success("Success!");
  };
  return (
    <>
      <Meta title="Login" />
      <section className="tf-section tf-explore tf-filter tf-center mt-20 !p-0">
        <div className="tf-container lg:px-80">
          <div className="flex justify-center">
            <h4 className="heading text-6xl font-semibold">Update Profile</h4>
          </div>
          <div className="row pt-12">
            <div className="col-md-12">
              <div className="tf-heading style-2 wow fadeInUp !justify-start">
                <h4 className="heading text-4xl font-semibold">
                  Social Connections
                </h4>
              </div>
            </div>
            <div className="bg-[#131924] border-jacarta-600 rounded-2xl border  py-4 px-8 mt-6">
              <div className="mb-2">
                <div className="mt-6">
                  <div>
                    <span className=" text-lg text-white mt-1 font-display font-semibold">
                      Twitter <span>(*)</span>
                    </span>
                  </div>
                  <div className="search flex justify-end md:flex-none mt-2">
                    <input
                      defaultValue={data?.twitterUrl || ""}
                      type="text"
                      id="profile-tw"
                      className="custom-text-input"
                      placeholder="Twitter Name"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div>
                    <span className=" text-lg text-white mt-1 font-display font-semibold">
                      Discord
                    </span>
                  </div>
                  <div className="search flex justify-end md:flex-none mt-2">
                    <input
                      defaultValue={data?.discordUrl || ""}
                      type="text"
                      id="profile-dc"
                      placeholder="Discord ID"
                      className="custom-text-input"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div>
                    <span className=" text-lg text-white mt-1 font-display font-semibold">
                      Website
                    </span>
                  </div>
                  <div className="search flex justify-end md:flex-none mt-2">
                    <input
                      defaultValue={data?.twitterUrl || ""}
                      type="text"
                      id="profile-ws"
                      className="custom-text-input"
                      placeholder="Website URL"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row pt-12">
            <div className="col-md-12">
              <div className="tf-heading style-2 wow fadeInUp !justify-start">
                <h4 className="heading text-4xl font-semibold">
                  Personal Information
                </h4>
              </div>
              <div className="bg-[#131924] border-jacarta-600 rounded-2xl border py-4 px-8 mt-6">
                <div className="mb-2">
                  <div className="mt-6">
                    <div>
                      <span className=" text-lg text-white mt-1 font-display font-semibold">
                        Username
                      </span>
                    </div>
                    <div className="search flex justify-end md:flex-none mt-2">
                      <input
                        defaultValue={data?.userName || ""}
                        type="text"
                        id="profile-username"
                        className="custom-text-input"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div>
                      <span className=" text-lg text-white mt-1 font-display font-semibold">
                        Profile Image
                      </span>
                    </div>
                    <Upload
                      action="https://dev-assets.tocen.co/tocen/upload/"
                      listType="picture-circle"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      className="mt-2"
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="example"
                        style={{
                          width: "100%",
                        }}
                        src={previewImage}
                      />
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        
          <div className="flex justify-between w-full pb-24 pt-6">
            <Button className="btn-secondary w-1/2 mr-4">
              <span>Cancel</span>
            </Button>
            <button
              onClick={() => handleSave()}
              className="btn-primary w-1/2 ml-4"
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Explore;
