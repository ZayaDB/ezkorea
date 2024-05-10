import React, { useState, useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ContentArea from '../styles/ContentArea';
import theme from '../styles/theme';
import styled from '@emotion/styled';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 컨셉과 색상 선택에 변화 일어날 시 오류 감지
  useEffect(() => {
    if (selectedConcepts.length > 0) {
      clearErrors('submissionConcepts');
    }
    if (selectedColors.length > 0) {
      clearErrors('submissionColors');
    }
  }, [selectedConcepts, selectedColors, clearErrors]);

  const triggerFileInput = () => {
    // ref를 사용하여 실제 input 요소를 트리거합니다
    fileInputRef.current?.click();
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

  // 제품명 입력 시 배열에 추가
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

  //체크박스 대신 버튼 토글로 변경
  const toggleSelection = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const currentIndex = list.indexOf(item);
    const newChecked = [...list];
    currentIndex === -1
      ? newChecked.push(item)
      : newChecked.splice(currentIndex, 1);
    setList(newChecked);
    clearErrors(
      list === selectedConcepts ? 'submissionConcepts' : 'submissionColors'
    );
  };

  // 모달 관련
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit: SubmitHandler<IFormInput> = data => {
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

  return (
    <ContentArea>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' flexDirection='column'>
          <SubTitle text='사진'></SubTitle>
          <Box display='flex' flexDirection='row'>
            <input
              type='file'
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Button onClick={triggerFileInput} variant='contained'>
              파일 선택
            </Button>

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
            {errors.files && (
              <Typography margin='0px' padding='0px' color='error'>
                {errors.files.message}
              </Typography>
            )}
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
            FormHelperTextProps={{
              sx: { marginLeft: 0, marginRight: 0 }, // 마진 왼쪽과 오른쪽을 0으로 설정
            }}
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
            rows={8}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
            fullWidth
            variant='outlined'
            inputProps={{ maxLength: 2000 }}
            FormHelperTextProps={{
              sx: { marginLeft: 0, marginRight: 0 }, // 마진 왼쪽과 오른쪽을 0으로 설정
            }}
          />

          <SubTitle text='제품 선택'></SubTitle>

          <ProductBox>
            <TextField
              type='text'
              value={productName}
              onChange={e => setProductName(e.target.value)}
              onKeyDown={handleKeyPress}
              variant='outlined'
              placeholder='제품명을 입력해주세요.'
              sx={{ width: '100%' }}
            />
            <Button
              type='button'
              onClick={addProduct}
              sx={{
                color: theme.palette.common.black,
                backgroundColor: 'primary.main',
                ':hover': { backgroundColor: 'primary.main' },
              }}
            >
              등록
            </Button>
            <List>
              {products.map((product, index) => (
                <ListItem
                  key={index}
                  sx={{
                    border: '1px solid',
                    borderColor: 'primary.main',
                    justifyContent: 'space-between',
                  }}
                >
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
          </ProductBox>

          <SubTitle text='컨셉 선택'></SubTitle>
          <Box>
            {['antique', 'gaming', 'simple', 'unique'].map(concept => (
              <SelectButton
                key={concept}
                onClick={() =>
                  toggleSelection(
                    concept,
                    selectedConcepts,
                    setSelectedConcepts
                  )
                }
                variant='outlined'
                sx={{
                  bgcolor: selectedConcepts.includes(concept)
                    ? 'primary.main'
                    : 'inherit',
                  ':hover': {
                    backgroundColor: selectedConcepts.includes(concept)
                      ? 'primary.main'
                      : 'inherit',
                  },
                }}
              >
                {concept}
              </SelectButton>
            ))}
            {errors.submissionConcepts && (
              <Typography color='error'>
                {errors.submissionConcepts.message}
              </Typography>
            )}
          </Box>
          <Box>
            <SubTitle text='컬러 선택' />
            {['black', 'white', 'wood', 'pink'].map(color => (
              <SelectButton
                key={color}
                variant='outlined'
                onClick={() =>
                  toggleSelection(color, selectedColors, setSelectedColors)
                }
                sx={{
                  bgcolor: selectedColors.includes(color)
                    ? 'primary.main'
                    : 'inherit',
                  ':hover': {
                    backgroundColor: selectedColors.includes(color)
                      ? 'primary.main'
                      : 'inherit',
                  },
                }}
              >
                <ColorCircle color={color} />
                {color}
              </SelectButton>
            ))}
            {errors.submissionColors && (
              <Typography color='error'>
                {errors.submissionColors.message}
              </Typography>
            )}
          </Box>
          {/* <SubTitle text='컬러 선택'></SubTitle>
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
          </div> */}
        </Box>
        <Button type='button' variant='outlined'>
          취소하기
        </Button>
        <Button
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.black,
            ':hover': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
          type='submit'
        >
          등록하기
        </Button>
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

const ProductBox = styled(Box)({
  maxWidth: '710px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const SelectButton = styled(Button)({
  marginY: '8px',
  color: 'black',
  margin: '0 8px 0 0',
  minWidth: '115px',
});

// Color 표시 원 스타일 정의
const ColorCircle = styled(Box)<{ color: string }>(({ color }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  border: color === 'white' ? '1px solid black' : 'none',
  backgroundColor: color === 'wood' ? '#9A6322' : color,
  marginRight: '8px',
}));
