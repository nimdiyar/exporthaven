import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import CoverPhotoSection from "../components/profile/CoverPhotoSection";
import ProfilePhotoSection from "../components/profile/ProfilePhotoSection";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileInfoForm from "../components/profile/ProfileInfoForm";
import Gallery from "../components/profile/Gallery";
import Posts from "../components/profile/Posts";
import Ads from "../components/profile/Ads";
import Orders from "../components/profile/Orders";

const ManufacturerProfile = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // Profile data
  const [profile, setProfile] = useState({});
  const [ads, setAds] = useState([]);
  const [orders, setOrders] = useState([]);
  // Cover & profile photos
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState("");
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");
  // Additional fields
  const [contactPerson, setContactPerson] = useState("");
  const [businessAddress, setBusinessAddress] = useState({
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [establishmentDate, setEstablishmentDate] = useState("");
  const [businessRegNumber, setBusinessRegNumber] = useState("");
  const [certifications, setCertifications] = useState("");
  const [bio, setBio] = useState("");
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedIn: "",
    youtube: "",
  });
  // Gallery state
  const [galleryImages, setGalleryImages] = useState([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  // Posts state
  const [postForm, setPostForm] = useState({
    title: "",
    description: "",
    imageFile: null,
  });
  const [posts, setPosts] = useState([]);
  // Active tab state
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setCoverPhotoPreview(res.data.coverPhoto);
        setProfilePhotoPreview(res.data.profilePhoto);
        setContactPerson(res.data.contactPerson || "");
        setBusinessAddress(res.data.businessAddress || {});
        setEstablishmentDate(
          res.data.establishmentDate
            ? res.data.establishmentDate.split("T")[0]
            : ""
        );
        setBusinessRegNumber(res.data.businessRegNumber || "");
        setCertifications(
          res.data.certifications ? res.data.certifications.join(", ") : ""
        );
        setBio(res.data.bio || "");
        setSocialMedia(
          res.data.socialMedia || {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedIn: "",
            youtube: "",
          }
        );
        setGalleryImages(res.data.gallery || []);
        setPosts(res.data.posts || []);
      } catch (error) {
        toast.error("Error loading profile data.");
      }
    };
    const fetchAds = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/ads?user=${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAds(res.data);
      } catch (error) {
        toast.error("Error loading ads.");
      }
    };
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/orders/manufacturer`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        toast.error("Error loading orders.");
      }
    };
    fetchProfile();
    fetchAds();
    fetchOrders();
  }, [user, token]);

  // File upload handlers
  const handleCoverPhotoChange = (file) => {
    setCoverPhotoFile(file);
  };
  const handleUploadCoverPhoto = async () => {
    if (!coverPhotoFile) {
      toast.error("Please select a cover photo.");
      return;
    }
    const formData = new FormData();
    formData.append("coverPhoto", coverPhotoFile);
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/profile/cover`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfile(res.data);
      toast.success("Cover photo updated!");
    } catch (error) {
      toast.error("Error updating cover photo.");
    }
  };

  const handleProfilePhotoChange = (file) => {
    setProfilePhotoFile(file);
  };
  const handleUploadProfilePhoto = async () => {
    if (!profilePhotoFile) {
      toast.error("Please select a profile photo.");
      return;
    }
    const formData = new FormData();
    formData.append("profilePhoto", profilePhotoFile);
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfile(res.data);
      toast.success("Profile photo updated!");
    } catch (error) {
      toast.error("Error updating profile photo.");
    }
  };

  // Save profile info
  const handleProfileInfoSave = async () => {
    const updatedData = {
      name: profile.name,
      contactPerson,
      phone: profile.phone,
      businessAddress,
      establishmentDate,
      businessRegNumber,
      certifications: certifications.split(",").map((s) => s.trim()),
      bio,
      socialMedia,
    };
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/users/profile`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
      toast.success("Profile info updated!");
    } catch (error) {
      toast.error("Error updating profile info.");
    }
  };

  // Gallery handlers
  const handleNewGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setNewGalleryFiles(files);
  };
  const handleAddGalleryImages = async () => {
    if (newGalleryFiles.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }
    for (const file of newGalleryFiles) {
      const formData = new FormData();
      formData.append("galleryImage", file);
      try {
        const res = await axios.post(
          `${API_BASE_URL}/api/profile/gallery`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setGalleryImages(res.data.gallery || []);
        toast.success("Gallery image added!");
      } catch (error) {
        toast.error("Error adding gallery image.");
      }
    }
    setNewGalleryFiles([]);
  };
  const handleDeleteGalleryImage = async (imageUrl) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/api/profile/gallery`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { imageUrl },
      });
      setGalleryImages(res.data.gallery || []);
      toast.success("Gallery image removed!");
    } catch (error) {
      toast.error("Error removing gallery image.");
    }
  };
  const handleGalleryPrev = () => {
    setGalleryIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };
  const handleGalleryNext = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  // Posts handlers
  const handlePostInputChange = (e) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };
  const handlePostImageChange = (e) => {
    setPostForm({ ...postForm, imageFile: e.target.files[0] });
  };
  const handleAddPost = async () => {
    const { title, description, imageFile } = postForm;
    if (!title || !description) {
      toast.error("Please fill in title and description.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) formData.append("postImage", imageFile);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/profile/post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPosts(res.data.posts || []);
      toast.success("Post added!");
      setPostForm({ title: "", description: "", imageFile: null });
    } catch (error) {
      toast.error("Error adding post.");
    }
  };

  // Ads functions
  const handleDeleteAd = async (adId) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/ads/${adId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== adId));
      toast.success("Ad deleted successfully!");
    } catch (error) {
      toast.error("Error deleting ad.");
    }
  };

  return (
    <div className="bg-[#ffffff] min-h-screen">
      <CoverPhotoSection
        coverPhoto={coverPhotoPreview}
        onChange={handleCoverPhotoChange}
        onUpload={handleUploadCoverPhoto}
      />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="md:w-1/3 lg:w-1/4">
            <ProfilePhotoSection
              profilePhoto={profilePhotoPreview}
              onChange={handleProfilePhotoChange}
              onUpload={handleUploadProfilePhoto}
              companyName={profile.companyName}
              email={profile.email}
              phone={profile.phone}
            />
            <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          {/* Main Content Area */}
          <div className="md:w-2/3 lg:w-3/4">
            {activeTab === "profile" && (
              <ProfileInfoForm
                contactPerson={contactPerson}
                setContactPerson={setContactPerson}
                establishmentDate={establishmentDate}
                setEstablishmentDate={setEstablishmentDate}
                businessRegNumber={businessRegNumber}
                setBusinessRegNumber={setBusinessRegNumber}
                certifications={certifications}
                setCertifications={setCertifications}
                businessAddress={businessAddress}
                setBusinessAddress={setBusinessAddress}
                bio={bio}
                setBio={setBio}
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                onSave={handleProfileInfoSave}
              />
            )}
            {activeTab === "gallery" && (
              <Gallery
                images={galleryImages}
                galleryIndex={galleryIndex}
                onPrev={handleGalleryPrev}
                onNext={handleGalleryNext}
                onSelect={setGalleryIndex}
                onAdd={handleAddGalleryImages}
                onDelete={handleDeleteGalleryImage}
                newFiles={newGalleryFiles}
                onNewFilesChange={handleNewGalleryChange}
              />
            )}
            {activeTab === "posts" && (
              <Posts
                posts={posts}
                onAddPost={handleAddPost}
                postForm={postForm}
                onPostInputChange={handlePostInputChange}
                onPostImageChange={handlePostImageChange}
              />
            )}
            {activeTab === "ads" && <Ads ads={ads} onDelete={handleDeleteAd} />}
            {activeTab === "orders" && (
              <Orders orders={orders} otherPartyLabel="Exporter" />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManufacturerProfile;
