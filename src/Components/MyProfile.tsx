const MyProfile = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">My Profile</h2>
      <form className="space-y-4 max-w-md">
        <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
        <textarea placeholder="Short Bio" className="w-full p-2 border rounded" />
        <input type="text" placeholder="Goals" className="w-full p-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default MyProfile;
