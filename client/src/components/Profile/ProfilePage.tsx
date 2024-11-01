import { useNavigate } from 'react-router-dom';
import { useGetAccountQuery, useDeleteAccountMutation, useUpdateAccountMutation } from '../../services/usersApi';
import { useState } from 'react';

const ProfilePage = () => {
  const navigate = useNavigate(); 
  const { data: user, error, isLoading, refetch } = useGetAccountQuery({});
  const [deleteAccount] = useDeleteAccountMutation();
  const [updateAccount] = useUpdateAccountMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(
    { firstName: user?.firstName, lastName: user?.lastName});

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateAccount(editedUser).unwrap();
      setIsEditing(false);
      await refetch();
      alert('Profile updated successfully!');
    } catch (err){
      alert('Error updating profile');
      console.log('failed to update account',err);
    }
  };

  const handleCancel = () => {
    setEditedUser({ firstName: user?.firstName, lastName: user?.lastName});
    setIsEditing(false);
  };

  const handleInputChange = (e:React.ChangeEvent) =>{
    const {name, value} = e.target as HTMLInputElement;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      await deleteAccount({}).unwrap();
      alert('Account deleted successfully!');
      navigate('/onboarding');
    }
  };

  if (isLoading) return <div className="text-center text-2xl my-10">Loading...</div>;
  if (error) return <div className="text-center text-2xl my-10">Error fetching profile</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-5">
      <div className="profile-card mx-auto max-w-lg p-5 md:p-10 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile Information</h2>
        <div className="mb-4">
          <p className="text-lg text-gray-700"><strong>First Name:</strong> 
              {isEditing ? (
                <input type="text" name="firstName" value={editedUser.firstName} onChange={handleInputChange} className="ml-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none" />
              ) : (
                <span className='ml-2'>{user.firstName}</span>
              )}
          </p>
          <p className="text-lg text-gray-700"><strong>Last Name:</strong> 
              {isEditing ? (
                <input type="text" name="lastName" value={editedUser.lastName} onChange={handleInputChange} className="ml-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none" />
              ) : (
                <span className='ml-2'>{user.lastName}</span>
              )}
          </p>
          <p className="text-lg text-gray-700"><strong>Email:</strong>
                <span className='ml-2'>{user.email}</span>
          </p>
          <p className="text-lg text-gray-700"><strong>Role:</strong> {user.role}</p>
          <p className="text-lg text-gray-700"><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          <p className="text-lg text-gray-700"><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
        </div>
        {isEditing ? (
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="mt-5 bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="mt-5 bg-gray-600 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="mt-5 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Edit Profile
          </button>
        )}
        <button
          onClick={handleDelete}
          className="mt-5 w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
