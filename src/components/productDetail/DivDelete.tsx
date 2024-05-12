// import { useState, ChangeEvent } from 'react';

interface DeleteProps {
  title: string;
}
export default function DivDelete({ title }: DeleteProps) {
  //   const [divOption, setDivOption] = useState([
  //     { id: 1, text: '1' },
  //     { id: 2, text: '2' },
  //     { id: 3, text: '3' },
  //     { id: 4, text: '4' },
  //   ]);
  //   const [name, setName] = useState('');
  //   const [num, setNum] = useState(5);

  //   const onChange = (e: React.MouseEvent) => {
  //     setName(e.target.value);
  //   };
  //   const plusClick = () => {
  //     if (name !== '') {
  //       const plus = divOption.concat({
  //         id: num,
  //         text: name,
  //       });
  //     }
  //   };
  return <div>{title}</div>;
}
