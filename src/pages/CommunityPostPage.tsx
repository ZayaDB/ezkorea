import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ContentArea from '../styles/ContentArea';
import { Box, Typography } from '@mui/material';

import SubTitle from '../components/community/post/SubTitle';

interface IFormInput {
  files: File[];
  title: string;
  description: string;
  concepts: string[];
  colors: string[];
  submissionConcepts?: string;
  submissionColors?: string;
}

function CommunityPostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IFormInput>({});

  console.log('formState errors1:', errors);
  const [files, setFiles] = useState<File[]>([]);

  const [products, setProducts] = useState<string[]>([]);
  const [productName, setProductName] = useState('');
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = (data, event?) => {
    console.log('handleSubmit 함수가 호출되었습니다.');
    console.log(data);
    const completeData = {
      fileLength: files.length,
      ...data,
      products: products,
      concepts: selectedConcepts,
      colors: selectedColors,
    };

    console.log('Complete submission data:', completeData);

    if (!selectedConcepts.length || !selectedColors.length) {
      if (!selectedConcepts.length) {
        setError('submissionConcepts', {
          type: 'manual',
          message: '하나 이상의 컨셉을 선택해주세요.',
        });
      }
      if (!selectedColors.length) {
        setError('submissionColors', {
          type: 'manual',
          message: '하나 이상의 컬러를 선택해주세요.',
        });
      }
      return;
    }

    clearErrors();
  };

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      const newFiles = [...files, ...fileArray];
      if (newFiles.length < 1 || newFiles.length > 4) {
        setError('files', {
          type: 'manual',
          message: '1개 이상 4개 이하의 사진을 업로드해주세요.',
        });
        console.log('사진 에러');
      } else {
        clearErrors('files');
        setFiles(newFiles);
      }
    }
  };

  // 파일 제거 핸들러
  const handleRemoveFile = (fileIndex: number) => {
    const newFiles = files.filter((_, index) => index !== fileIndex);
    if (newFiles.length < 1) {
      setError('files', {
        type: 'manual',
        message: '1개의 이미지는 필수로 첨부해주세요.',
      });
    } else {
      clearErrors('files');
      setFiles(newFiles);
    }
  };
  const addProduct = () => {
    if (productName && !products.includes(productName)) {
      setProducts([...products, productName]);
      setProductName(''); // 입력 필드 초기화
    }
  };

  //제품평 인풋창에서 엔터 누르면 추가
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 엔터 키로 인한 폼 제출 방지
      addProduct();
    }
  };

  const handleCheckboxChange = (
    type: 'concepts' | 'colors',
    value: string,
    checked: boolean
  ) => {
    const setter =
      type === 'concepts' ? setSelectedConcepts : setSelectedColors;
    setter(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  return (
    <ContentArea>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' flexDirection='column'>
          <SubTitle text='사진'></SubTitle>
          <Box display='flex' flexDirection='row'>
            <input type='file' multiple onChange={handleFileChange} />

            {files.map((file, index) => {
              const imageUrl = URL.createObjectURL(file);
              return (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    margin: '10px',
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    style={{ width: '100px', height: '100px' }}
                    onLoad={() => URL.revokeObjectURL(imageUrl)}
                  />
                  <button
                    type='button'
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      padding: '2px 5px',
                      lineHeight: '1',
                      color: 'white',
                      backgroundColor: 'red',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleRemoveFile(index)}
                  >
                    X
                  </button>
                </div>
              );
            })}
            {errors.files && <p>{errors.files.message}</p>}
          </Box>
          <SubTitle text='글 제목'></SubTitle>

          <input
            type='text'
            placeholder='Title'
            {...register('title', {
              required: '제목을 입력해주세요.',
              maxLength: {
                value: 20,
                message: '20자 이내로 입력해주세요',
              },
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
          <SubTitle text='설명'></SubTitle>

          <textarea
            placeholder='Description'
            {...register('description', {
              required: '설명을 입력해주세요.',
              maxLength: {
                value: 2000,
                message: '설명은 2000자 이내로 입력해주세요.',
              },
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}
          <SubTitle text='제품 선택'></SubTitle>

          <div>
            Enter Product Name:
            <input
              type='text'
              value={productName}
              onChange={e => setProductName(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button type='button' onClick={addProduct}>
              Add Product
            </button>
            <ul>
              {products.map((product, index) => (
                <li key={index}>
                  {product}
                  <button
                    type='button'
                    onClick={() =>
                      setProducts(currentProducts =>
                        currentProducts.filter((_, i) => i !== index)
                      )
                    }
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SubTitle text='컨셉 선택'></SubTitle>
            {['antique', 'gaming', 'simple', 'unique'].map(concept => (
              <label key={concept}>
                <input
                  type='checkbox'
                  checked={selectedConcepts.includes(concept)}
                  onChange={e =>
                    handleCheckboxChange('concepts', concept, e.target.checked)
                  }
                />
                {concept}
              </label>
            ))}
            {errors.submissionConcepts && (
              <p>{errors.submissionConcepts.message}</p>
            )}
          </div>
          <div>
            <SubTitle text='컬러 선택'></SubTitle>
            {['black', 'white', 'wood', 'pink'].map(color => (
              <label key={color}>
                <input
                  type='checkbox'
                  checked={selectedColors.includes(color)}
                  onChange={e =>
                    handleCheckboxChange('colors', color, e.target.checked)
                  }
                />
                {color}
              </label>
            ))}
            {errors.submissionColors && (
              <p>{errors.submissionColors.message}</p>
            )}
          </div>
        </Box>
        <button type='submit'>Upload</button>
      </form>
    </ContentArea>
  );
}

export default CommunityPostPage;
