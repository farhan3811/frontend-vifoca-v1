import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../actions/userActions'; // Ganti dengan aksi Redux Anda

const UpdatePassword = () => {
  const dispatch = useDispatch();
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Password baru dan konfirmasi password tidak cocok.");
      return;
    }

    // Dispatch aksi untuk memperbarui password
    dispatch(updatePassword({ oldPassword, newPassword }))
      .then(() => {
        setSuccess("Password berhasil diperbarui.");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
      })
      .catch((err) => {
        setError("Gagal memperbarui password. Silakan coba lagi.");
        console.error(err);
      });
  };

  return (
    <div className="update-password-form">
      <h2>Perbarui Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password Lama</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password Baru</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Konfirmasi Password Baru</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Perbarui Password</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default UpdatePassword;
