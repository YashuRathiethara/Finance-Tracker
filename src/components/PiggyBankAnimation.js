import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

// Utility functions for encryption and decryption
const formatPassword = (password) => password.padStart(4, '0').substring(0, 4);

const encryptAmount = (amount, password) => {
  const key = CryptoJS.enc.Utf8.parse(formatPassword(password));
  return CryptoJS.AES.encrypt(amount.toString(), key, {
    iv: CryptoJS.enc.Hex.parse('0000000000000000') // Use a static IV for simplicity
  }).toString();
};

const decryptAmount = (encryptedAmount, password) => {
  const key = CryptoJS.enc.Utf8.parse(formatPassword(password));
  const bytes = CryptoJS.AES.decrypt(encryptedAmount, key, {
    iv: CryptoJS.enc.Hex.parse('0000000000000000') // Use a static IV for simplicity
  });
  return parseFloat(bytes.toString(CryptoJS.enc.Utf8));
};

const PiggyBankAnimation = ({ amount }) => {
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  // Encrypt the amount with a dummy password
  const encryptedAmount = encryptAmount(amount, '0000'); // Example password, replace with your logic

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowAmount = () => {
    try {
      decryptAmount(encryptedAmount, password);
      setIsPasswordCorrect(true);
    } catch {
      setIsPasswordCorrect(false);
    }
    setIsEncrypted(false);
  };

  const displayedAmount = isPasswordCorrect ? amount.toFixed(2) : 'Incorrect Password';

  return (
    <div>
      <h2>Piggy Bank</h2>
      {isEncrypted ? (
        <div>
          <input
            type="password"
            placeholder="Enter 4-digit password"
            value={password}
            onChange={handlePasswordChange}
            maxLength="4"
          />
          <button onClick={handleShowAmount}>
            Show Amount
          </button>
        </div>
      ) : (
        <div>{displayedAmount}</div>
      )}
      {!isEncrypted && <button onClick={() => setIsEncrypted(true)}>Hide Amount</button>}
    </div>
  );
};

export default PiggyBankAnimation;
