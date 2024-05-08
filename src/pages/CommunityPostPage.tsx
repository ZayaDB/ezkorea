import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ContentArea from '../styles/ContentArea';
import theme from '../styles/theme';
import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  ListItem,
  List,
} from '@mui/material';
import FeedTest from '../components/community/main/FeedTest';

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
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<IFormInput | null>(null);

  useEffect(() => {
    if (selectedConcepts.length > 0) {
      clearErrors('submissionConcepts');
    }
    if (selectedColors.length > 0) {
      clearErrors('submissionColors');
    }
  }, [selectedConcepts, selectedColors, clearErrors]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    if (!files.length) {
      setError('files', {
        type: 'manual',
        message: '1개 이상 4개 이하의 사진을 업로드해주세요.',
      });
    }

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
    if (selectedConcepts.length && selectedColors.length && files.length) {
      console.log('Form submitted:', completeData);
      setFormData(completeData); // Form 데이터 저장
      handleOpen(); // 모달 열기

      // 여기에 서버 전송 로직 추가
    }
  };

  const confirmSubmit = () => {
    console.log('Confirmed submission:', formData);
    handleClose(); // 모달 닫기
    // 여기에 실제 데이터 제출 로직을 추가할 수 있습니다.
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

          <TextField
            type='text'
            placeholder='20자 이내로 입력해주세요.'
            {...register('title', {
              required: '제목을 입력해주세요.',
              maxLength: {
                value: 20,
                message: '20자 이내로 입력해주세요.',
              },
            })}
            inputProps={{
              maxLength: 20,
            }}
            variant='outlined'
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ''}
          />
          <SubTitle text='설명'></SubTitle>

          <TextField
            placeholder='책상 인테리어를 자랑해주세요.'
            {...register('description', {
              required: '설명을 입력해주세요.',
              maxLength: {
                value: 2000,
                message: '설명은 2000자 이내로 입력해주세요.',
              },
            })}
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
            fullWidth
            variant='outlined'
            inputProps={{ maxLength: 2000 }}
          />

          <SubTitle text='제품 선택'></SubTitle>

          <Box>
            <TextField
              type='text'
              value={productName}
              onChange={e => setProductName(e.target.value)}
              onKeyDown={handleKeyPress}
              variant='outlined'
              placeholder='제품명을 입력해주세요.'
            />
            <Button
              type='button'
              onClick={addProduct}
              sx={{
                color: theme.palette.common.black,
                backgroundColor: theme.palette.primary.main,
                ':hover': { backgroundColor: theme.palette.primary.main },
              }}
            >
              등록
            </Button>
            <List>
              {products.map((product, index) => (
                <ListItem key={index}>
                  {product}
                  <Button
                    type='button'
                    onClick={() =>
                      setProducts(currentProducts =>
                        currentProducts.filter((_, i) => i !== index)
                      )
                    }
                    color='primary'
                  >
                    X
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>

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
        <button type='submit'>등록</button>
      </form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'아래 내용으로 피드를 등록하시겠습니까?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            제목: {formData?.title}
            <br />
            설명: {formData?.description}
            <br />
            컨셉:
            {formData && formData.concepts.length > 1
              ? formData?.concepts.join(', ')
              : formData?.concepts[0]}
            <br />
            컬러:
            {formData && formData.colors.length > 1
              ? formData?.colors.join(', ')
              : formData?.colors[0]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={confirmSubmit}>등록하기</Button>
        </DialogActions>
      </Dialog>
    </ContentArea>
  );
}

export default CommunityPostPage;
