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
  Button,
  TextField,
  ListItem,
  List,
} from '@mui/material';
import { useFileHandler } from '../hooks/community/useFileHandler';
import { useSelectionHandler } from '../hooks/community/useSelectionHandler';
import { useProductHandler } from '../hooks/community/useProductHandler';
import SubTitle from '../components/community/post/SubTitle';

interface IFormInput {
  files: File[];
  title: string;
  description: string;
  products: string[];
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
  const { products, productName, setProductName, addProduct, setProducts } =
    useProductHandler();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<IFormInput | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { files, handleFileChange, handleRemoveFile } = useFileHandler();
  const { selections: selectedConcepts, toggleSelection: toggleConcept } =
    useSelectionHandler<string>();
  const { selections: selectedColors, toggleSelection: toggleColor } =
    useSelectionHandler<string>();

  // 컨셉과 색상, 파일 선택에 변화 일어날 시 오류 감지
  useEffect(() => {
    if (selectedConcepts.length > 0) {
      clearErrors('submissionConcepts');
    }
    if (selectedColors.length > 0) {
      clearErrors('submissionColors');
    }
    if (files.length > 0 || files.length < 5) {
      clearErrors('files');
    }
  }, [selectedConcepts, selectedColors, files, clearErrors]);

  const triggerFileInput = () => {
    // ref를 사용하여 실제 input 요소를 트리거합니다
    fileInputRef.current?.click();
  };

  //제품평 인풋창에서 엔터 누르면 추가
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 엔터 키로 인한 폼 제출 방지
      addProduct();
    }
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
      products: products || [],
      concepts: selectedConcepts,
      colors: selectedColors,
    };

    console.log('Complete submission data:', completeData);
    if (!files.length || files.length > 4) {
      setError('files', {
        type: 'manual',
        message: '1개 이상 4개 이하의 사진을 업로드해주세요.',
      });
      window.scrollTo({
        top: 0, // 최상단
        behavior: 'smooth', // 부드러운 스크롤
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
    if (
      selectedConcepts.length &&
      selectedColors.length &&
      files.length &&
      files.length < 5
    ) {
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
          <SubTitle text='사진' isRequired={true}></SubTitle>
          <Box display='flex' flexDirection='row' flexWrap='wrap'>
            <input
              type='file'
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Button onClick={triggerFileInput} variant='text'>
              <img
                src='https://cdn-icons-png.flaticon.com/128/15288/15288391.png'
                alt='Upload file'
                width='130px'
              />
            </Button>
            <Box display='flex' flexDirection='row' flexWrap='wrap'>
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
                      style={{
                        width: '130px',
                        height: '130px',
                        borderRadius: '5px',
                      }}
                      onLoad={() => URL.revokeObjectURL(imageUrl)}
                    />
                    <button
                      type='button'
                      style={{
                        position: 'absolute',
                        top: '-7px',
                        right: '-7px',
                        padding: '2px 6px 3px 6px',
                        lineHeight: '1',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        fontSize: '12px',
                        backgroundColor: '#F6F6F6',
                      }}
                      onClick={() => handleRemoveFile(index)}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </Box>
          </Box>

          <Typography
            sx={{
              fontSize: theme.typography.body2.fontSize,
              color: theme.palette.grey[400],
            }}
          >
            사진은 최대 4장까지 올릴 수 있고 1:1 비율로 자동 조정돼요.
          </Typography>
          {errors.files && (
            <ErrorMsg color='error'>{errors.files.message}</ErrorMsg>
          )}

          <SubTitle text='글 제목' isRequired={true}></SubTitle>

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
          <SubTitle text='설명' isRequired={true}></SubTitle>

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
              sx: { marginLeft: 0, marginRight: 0 },
            }}
          />

          <SubTitle text='제품 선택' isRequired={false}></SubTitle>

          <ProductBox>
            <TextField
              type='text'
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder='제품명 입력'
              onKeyDown={handleKeyPress}
              variant='outlined'
              sx={{ width: '100%' }}
            />
            <Button
              type='button'
              onClick={addProduct}
              variant='outlined'
              sx={{
                color: theme.palette.common.black,
                minHeight: '56px',
                borderColor: theme.palette.grey[300],
                // backgroundColor: 'primary.main',
                ':hover': { backgroundColor: 'primary.main' },
                margin: '0 0 0 16px',
              }}
            >
              등록
            </Button>
          </ProductBox>
          <List>
            {products.map((product, index) => (
              <ListItem
                key={index}
                sx={{
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: '5px',
                  justifyContent: 'space-between',
                  width: 'calc(100% - 80px)',
                  marginBottom: '16px',
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
                  sx={{ minWidth: '20px !important' }}
                >
                  X
                </Button>
              </ListItem>
            ))}
          </List>

          <SubTitle text='컨셉 선택' isRequired={true}></SubTitle>
          <Box>
            {['antique', 'gaming', 'simple', 'unique'].map(concept => (
              <SelectButton
                key={concept}
                onClick={() => toggleConcept(concept)}
                sx={{
                  bgcolor: selectedConcepts.includes(concept)
                    ? 'primary.main'
                    : 'inherit',
                  border: selectedConcepts.includes(concept) ? 'none' : 'solid',
                }}
                variant='outlined'
              >
                {concept}
              </SelectButton>
            ))}
            {errors.submissionConcepts && (
              <ErrorMsg color='error'>
                {errors.submissionConcepts.message}
              </ErrorMsg>
            )}
          </Box>
          <Box>
            <SubTitle text='컬러 선택' isRequired={true} />
            {['black', 'white', 'wood', 'pink'].map(color => (
              <SelectButton
                key={color}
                variant='outlined'
                onClick={() => toggleColor(color)}
                sx={{
                  bgcolor: selectedColors.includes(color)
                    ? 'primary.main'
                    : 'inherit',
                  border: selectedColors.includes(color) ? 'none' : 'solid',
                }}
              >
                <ColorCircle color={color} />
                {color}
              </SelectButton>
            ))}
            {errors.submissionColors && (
              <ErrorMsg color='error'>
                {errors.submissionColors.message}
              </ErrorMsg>
            )}
          </Box>
        </Box>
        <Box
          mt={4}
          mb={4}
          display='flex'
          flexDirection='row'
          justifyContent='flex-end'
        >
          <Button
            type='button'
            variant='outlined'
            sx={{ margin: '0 16px 0 0', minWidth: '115px' }}
          >
            취소하기
          </Button>
          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.black,
              ':hover': {
                backgroundColor: theme.palette.primary.main,
              },
              minWidth: '115px',
            }}
            type='submit'
          >
            등록하기
          </Button>
        </Box>
      </form>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ minWidth: 250 }}>
          <DialogContentText>
            <Typography>피드를 등록하시겠습니까?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: theme.palette.grey[200] }}>
            취소
          </Button>
          <Button
            onClick={confirmSubmit}
            sx={{ color: theme.palette.common.black }}
          >
            등록
          </Button>
        </DialogActions>
      </Dialog>
    </ContentArea>
  );
}

export default CommunityPostPage;

const ProductBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center !important',
});

const SelectButton = styled(Button)({
  marginY: '8px',
  color: 'black',
  margin: '0 8px 8px 0',
  minWidth: '115px',
  borderColor: theme.palette.grey[200],
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

const ErrorMsg = styled(Typography)({
  margin: '0px',
  padding: '0px',
  fontSize: '12px',
});
