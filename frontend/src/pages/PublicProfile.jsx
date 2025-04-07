import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";
import { useParams } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Award,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Share2,
} from "lucide-react";

const PublicProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/users/public/${userId}`
        );
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching public profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="text-xl text-[#353535]">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="text-xl text-[#353535]">Profile not found</div>
      </div>
    );
  }

  const handleGalleryPrev = () => {
    if (profile.gallery && profile.gallery.length > 0) {
      setGalleryIndex(
        (prev) => (prev - 1 + profile.gallery.length) % profile.gallery.length
      );
    }
  };

  const handleGalleryNext = () => {
    if (profile.gallery && profile.gallery.length > 0) {
      setGalleryIndex((prev) => (prev + 1) % profile.gallery.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className="relative h-[50vh] bg-[#d9d9d9]">
        {profile.coverPhoto ? (
          <img
            src={profile.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#284b63]/30">
            <span className="text-[#353535]/50 text-xl">No cover photo</span>
          </div>
        )}
        <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              className="h-64 w-64 rounded-full border-8 border-[#ffffff] shadow-2xl object-cover bg-[#ffffff]"
              src={
                profile.profilePhoto ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile.companyName || profile.name || "User"
                )}&background=284b63&color=ffffff&size=192`
              }
              alt="Profile"
            />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#353535] mb-2">
            {profile.companyName || profile.name}
          </h1>
          {profile.bio && (
            <p className="text-[#353535]/80 text-lg max-w-2xl mx-auto">
              {profile.bio}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#ffffff] rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-[#353535] mb-6">
                Gallery
              </h2>
              {profile.gallery && profile.gallery.length > 0 ? (
                <div className="relative rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={profile.gallery[galleryIndex]}
                      alt="Gallery"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#ffffff] rounded-full p-3 shadow-lg hover:bg-[#ffffff]/90 transition-all"
                    onClick={handleGalleryPrev}
                  >
                    <ChevronLeft className="text-[#284b63]" size={24} />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#ffffff] rounded-full p-3 shadow-lg hover:bg-[#ffffff]/90 transition-all"
                    onClick={handleGalleryNext}
                  >
                    <ChevronRight className="text-[#284b63]" size={24} />
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="bg-[#353535]/70 rounded-full px-4 py-2 text-sm text-[#ffffff]">
                      {galleryIndex + 1} / {profile.gallery.length}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-[#353535] text-center py-8">
                  No gallery images available.
                </p>
              )}
            </div>
            <div className="bg-[#ffffff] rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-[#353535] mb-6">
                Posts
              </h2>
              {profile.posts && profile.posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.posts.map((post, idx) => (
                    <div
                      key={idx}
                      className="bg-[#ffffff] rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-transform"
                    >
                      {post.image && (
                        <div className="aspect-w-16 aspect-h-9">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-[#353535] mb-3">
                          {post.title}
                        </h3>
                        <p className="text-[#353535]/80">{post.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#353535] text-center py-8">
                  No posts available.
                </p>
              )}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-[#ffffff] rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-[#353535] mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail
                    className="text-[#3c6e71] mr-4 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#353535]/70 mb-1">
                      Email
                    </p>
                    <p className="text-[#353535] text-lg">
                      {profile.email || "Email not available"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone
                    className="text-[#3c6e71] mr-4 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#353535]/70 mb-1">
                      Phone
                    </p>
                    <p className="text-[#353535] text-lg">
                      {profile.phone || "Phone not available"}
                    </p>
                  </div>
                </div>
                {profile.businessAddress && (
                  <div className="flex items-start">
                    <MapPin
                      className="text-[#3c6e71] mr-4 flex-shrink-0 mt-1"
                      size={24}
                    />
                    <div>
                      <p className="text-sm font-medium text-[#353535]/70 mb-1">
                        Business Address
                      </p>
                      <p className="text-[#353535] text-lg">
                        {profile.businessAddress.street},{" "}
                        {profile.businessAddress.city},{" "}
                        {profile.businessAddress.province},{" "}
                        {profile.businessAddress.postalCode}
                      </p>
                    </div>
                  </div>
                )}
                {profile.contactPerson && (
                  <div className="flex items-start">
                    <div className="text-[#3c6e71] mr-4 flex-shrink-0 mt-1 text-2xl">
                      👤
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#353535]/70 mb-1">
                        Contact Person
                      </p>
                      <p className="text-[#353535] text-lg">
                        {profile.contactPerson}
                      </p>
                    </div>
                  </div>
                )}
                {profile.establishmentDate && (
                  <div className="flex items-start">
                    <Calendar
                      className="text-[#3c6e71] mr-4 flex-shrink-0 mt-1"
                      size={24}
                    />
                    <div>
                      <p className="text-sm font-medium text-[#353535]/70 mb-1">
                        Establishment Date
                      </p>
                      <p className="text-[#353535] text-lg">
                        {profile.establishmentDate.split("T")[0]}
                      </p>
                    </div>
                  </div>
                )}
                {profile.businessRegNumber && (
                  <div className="flex items-start">
                    <FileText
                      className="text-[#3c6e71] mr-4 flex-shrink-0 mt-1"
                      size={24}
                    />
                    <div>
                      <p className="text-sm font-medium text-[#353535]/70 mb-1">
                        Business Reg. Number
                      </p>
                      <p className="text-[#353535] text-lg">
                        {profile.businessRegNumber}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {profile.certifications && profile.certifications.length > 0 && (
              <div className="bg-[#ffffff] rounded-xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Award className="text-[#3c6e71] mr-3" size={28} />
                  <h2 className="text-2xl font-semibold text-[#353535]">
                    Certifications
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profile.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="bg-[#284b63]/10 text-[#284b63] px-4 py-2 rounded-full text-base font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {profile.socialMedia &&
              Object.values(profile.socialMedia).some((val) => val) && (
                <div className="bg-[#ffffff] rounded-xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <Share2 className="text-[#3c6e71] mr-3" size={28} />
                    <h2 className="text-2xl font-semibold text-[#353535]">
                      Connect
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {profile.socialMedia?.facebook && (
                      <a
                        href={profile.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 rounded-xl bg-[#284b63]/5 hover:bg-[#284b63]/10 transition-all group"
                      >
                        <Facebook
                          className="text-[#284b63] group-hover:text-[#3c6e71] transition-colors mb-2"
                          size={32}
                        />
                        <span className="text-sm font-medium text-[#353535]">
                          Facebook
                        </span>
                      </a>
                    )}
                    {profile.socialMedia?.twitter && (
                      <a
                        href={profile.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 rounded-xl bg-[#284b63]/5 hover:bg-[#284b63]/10 transition-all group"
                      >
                        <Twitter
                          className="text-[#284b63] group-hover:text-[#3c6e71] transition-colors mb-2"
                          size={32}
                        />
                        <span className="text-sm font-medium text-[#353535]">
                          Twitter
                        </span>
                      </a>
                    )}
                    {profile.socialMedia?.instagram && (
                      <a
                        href={profile.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 rounded-xl bg-[#284b63]/5 hover:bg-[#284b63]/10 transition-all group"
                      >
                        <Instagram
                          className="text-[#284b63] group-hover:text-[#3c6e71] transition-colors mb-2"
                          size={32}
                        />
                        <span className="text-sm font-medium text-[#353535]">
                          Instagram
                        </span>
                      </a>
                    )}
                    {profile.socialMedia?.linkedIn && (
                      <a
                        href={profile.socialMedia.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 rounded-xl bg-[#284b63]/5 hover:bg-[#284b63]/10 transition-all group"
                      >
                        <Linkedin
                          className="text-[#284b63] group-hover:text-[#3c6e71] transition-colors mb-2"
                          size={32}
                        />
                        <span className="text-sm font-medium text-[#353535]">
                          LinkedIn
                        </span>
                      </a>
                    )}
                    {profile.socialMedia?.youtube && (
                      <a
                        href={profile.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 rounded-xl bg-[#284b63]/5 hover:bg-[#284b63]/10 transition-all group"
                      >
                        <Youtube
                          className="text-[#284b63] group-hover:text-[#3c6e71] transition-colors mb-2"
                          size={32}
                        />
                        <span className="text-sm font-medium text-[#353535]">
                          YouTube
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
