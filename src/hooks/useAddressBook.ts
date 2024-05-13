import { useState, useEffect } from 'react';

interface Address {
  name: string;
  nickname: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
}

export const useAddressBook = (): [
  Address[],
  (newAddress: Address) => void
] => {
  // 주소록 상태와 주소록 업데이트 함수
  const [addressBook, setAddressBook] = useState<Address[]>([]);

  // localStorage에서 주소록을 불러와 초기화
  useEffect(() => {
    const savedAddressBook = localStorage.getItem('addressBook');
    if (savedAddressBook) {
      setAddressBook(JSON.parse(savedAddressBook));
    }
  }, []);

  // 주소록을 localStorage에 저장하는 함수
  const saveAddressBook = (newAddressBook: Address[]): void => {
    try {
      localStorage.setItem('addressBook', JSON.stringify(newAddressBook));
      setAddressBook(newAddressBook);
      console.log('Address book saved successfully.');
    } catch (err) {
      console.error('Error saving address book:', err);
    }
  };

  // 주소록에 새로운 주소 추가하는 함수
  const addAddress = (newAddress: Address): void => {
    const newAddressBook = [...addressBook, newAddress];
    saveAddressBook(newAddressBook);
  };

  return [addressBook, addAddress];
};
