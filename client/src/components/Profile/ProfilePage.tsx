import { useNavigate } from 'react-router-dom';
import { useGetAccountQuery, useDeleteAccountMutation } from '../../services/usersApi';

const ProfilePage = () => {
  const navigate = useNavigate(); 
  const { data: user, error, isLoading } = useGetAccountQuery({});
  const [deleteAccount] = useDeleteAccountMutation();

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
          <p className="text-lg text-gray-700"><strong>First Name:</strong> {user.firstName}</p>
          <p className="text-lg text-gray-700"><strong>Last Name:</strong> {user.lastName}</p>
          <p className="text-lg text-gray-700"><strong>Email:</strong> {user.email}</p>
          <p className="text-lg text-gray-700"><strong>Role:</strong> {user.role}</p>
          <p className="text-lg text-gray-700"><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          <p className="text-lg text-gray-700"><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
        </div>
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
