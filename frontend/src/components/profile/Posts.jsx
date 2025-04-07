import React from "react";

const Posts = ({
  posts,
  onAddPost,
  postForm,
  onPostInputChange,
  onPostImageChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 text-[#353535] border-b pb-2">
        Posts
      </h2>
      <div className="mb-8 bg-[#d9d9d9] p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-[#353535]">
          Create New Post
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#353535] mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={postForm.title}
              onChange={onPostInputChange}
              className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
              placeholder="Post Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#353535] mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={postForm.description}
              onChange={onPostInputChange}
              className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none h-24"
              placeholder="Post Description"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#353535] mb-1">
              Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onPostImageChange}
              className="w-full p-2 text-sm text-[#353535] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#3c6e71] file:text-[#ffffff] hover:file:bg-[#284b63] hover:file:text-white"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onAddPost}
              className="px-6 py-2 bg-[#284b63] text-white rounded-md hover:bg-[#3c6e71] transition"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4 text-[#353535]">Your Posts</h3>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post, idx) => (
              <div
                key={idx}
                className="border border-[#d9d9d9] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h4 className="font-bold text-[#353535] mb-2">
                    {post.title}
                  </h4>
                  <p className="text-[#353535] text-sm">{post.description}</p>
                  <div className="mt-3 text-xs text-[#353535]">
                    Posted: {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-[#d9d9d9] h-32 rounded-lg">
            <p className="text-[#353535]">No posts yet</p>
            <p className="text-sm text-[#353535]">
              Create posts to share updates about your business
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
