import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFetchData } from '../hooks/useFetchData';
import { useFileHandler } from '../hooks/community/useFileHandler';
import { useProductHandler } from '../hooks/community/useProductHandler';
import { useSelectionHandler } from '../hooks/community/useSelectionHandler';
import { FeedData } from '../types/communityTypes';
import ContentArea from '../styles/ContentArea';
import theme from '../styles/theme';

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
  styled,
} from '@mui/material';
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

export default function CommunityModifyPage() {
  const { feedId } = useParams<{ feedId: string }>();
  const [data, loading, error] = useFetchData<FeedData[]>('/data/feed.json');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      title: '',
      description: '',
      products: [],
      concepts: [],
      colors: [],
    },
  });

  const { products, productName, setProductName, addProduct, setProducts } =
    useProductHandler();
  const [open, setOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [formData, setFormData] = useState<IFormInput | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const { files, handleFileChange, handleRemoveFile, setFiles } =
    useFileHandler();
  const {
    selections: selectedConcepts,
    toggleSelection: toggleConcept,
    setSelections: setSelectedConcepts,
  } = useSelectionHandler<string>();
  const {
    selections: selectedColors,
    toggleSelection: toggleColor,
    setSelections: setSelectedColors,
  } = useSelectionHandler<string>();

  // 렌더링 시 기본 값 채워넣기
  useEffect(() => {
    if (data && data.length > 0) {
      const feed = data.find(feed => feed.feedId.toString() === feedId);
      if (feed) {
        reset({
          title: feed.title,
          description: feed.description,
          products: feed.selectedProducts?.map(p => p.productName) || [],
          concepts: feed.concepts,
          colors: feed.colors,
        });
        setImageUrl(feed.images); // 이미지 파일로 변환하는 로직 필요
        setProducts(feed.selectedProducts?.map(p => p.productName) || []);
        setSelectedConcepts(feed.concepts);
        setSelectedColors(feed.colors);
      }
    }
  }, [
    data,
    feedId,
    reset,
    setFiles,
    setProducts,
    setSelectedConcepts,
    setSelectedColors,
  ]);

  // 값 변경에 따른 오류 제거
  useEffect(() => {
    if (selectedConcepts.length > 0) {
      clearErrors('submissionConcepts');
    }
    if (selectedColors.length > 0) {
      clearErrors('submissionColors');
    }
    if (files.length > 0 || imageUrl.length > 0) {
      clearErrors('files');
    }
    if (files.length + imageUrl.length < 5) {
      clearErrors('files');
    }
  }, [selectedConcepts, selectedColors, files, clearErrors]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

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
  const handleCancelOpen = () => setCancelOpen(true);
  const handleCancelClose = () => setCancelOpen(false);

  // 파일 업로드 인풋 트리거
  const triggerFileInput = () => {
    // ref를 사용하여 실제 input 요소를 트리거
    fileInputRef.current?.click();
  };

  const handleRemoveUrl = (index: number) => {
    const updatedFiles = imageUrl.filter((_, i) => i !== index);
    setImageUrl(updatedFiles);
  };

  const onSubmit: SubmitHandler<IFormInput> = data => {
    const completeData = {
      fileLength: files.length,
      ...data,
      products: products || [],
      concepts: selectedConcepts,
      colors: selectedColors,
    };
    if (
      imageUrl.length + files.length < 1 ||
      imageUrl.length + files.length > 4
    ) {
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
      (files.length || imageUrl.length > 0) &&
      files.length + imageUrl.length < 5
    ) {
      setFormData(completeData); // Form 데이터 저장
      handleOpen(); // 모달 열기
    }
  };

  const confirmSubmit = () => {
    console.log('Confirmed submission:', formData);
    handleClose(); // 모달 닫기
    window.location.href = '/community';
    // 서버에 데이터 전송
  };
  return (
    <ContentArea>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' flexDirection='column'>
          <SubTitle text='사진' isRequired={true}></SubTitle>
          <div
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {imageUrl.map((url, index) => {
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
                      src={url}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '130px',
                        height: '130px',
                        borderRadius: '5px',
                      }}
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
                      onClick={() => handleRemoveUrl(index)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
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
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
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
              sx: { marginLeft: 0, marginRight: 0 },
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

          <Box>
            <SubTitle text='컬러 선택' isRequired={true} />
            <ResponsiveContainer>
              {['black', 'white', 'wood', 'pink'].map(color => (
                <SelectButton
                  key={color}
                  onClick={() => toggleColor(color)}
                  sx={{
                    ...(selectedColors.includes(color)
                      ? containedButtonStyles
                      : outlineButtonStyles),
                  }}
                >
                  <ColorCircle color={color} />
                  {color}
                </SelectButton>
              ))}
            </ResponsiveContainer>
            {errors.submissionColors && (
              <ErrorMsg color='error'>
                {errors.submissionColors.message}
              </ErrorMsg>
            )}
          </Box>

          <Box>
            <SubTitle text='컨셉 선택' isRequired={true}></SubTitle>
            <ResponsiveContainer>
              {['antique', 'gaming', 'simple', 'unique'].map(concept => (
                <SelectButton
                  key={concept}
                  onClick={() => toggleConcept(concept)}
                  sx={{
                    ...(selectedConcepts.includes(concept)
                      ? containedButtonStyles
                      : outlineButtonStyles),
                  }}
                >
                  {concept}
                </SelectButton>
              ))}
            </ResponsiveContainer>
            {errors.submissionConcepts && (
              <ErrorMsg color='error'>
                {errors.submissionConcepts.message}
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
            onClick={handleCancelOpen}
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
      {/* 취소하기 모달 */}
      <Dialog open={cancelOpen} onClose={handleCancelClose}>
        <DialogContent sx={{ minWidth: 250 }}>
          <DialogContentText>
            <Typography>피드를 등록을 취소하시겠습니까?</Typography>
            <Typography>작성 내용은 저장되지 않습니다.</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelClose}
            sx={{ color: theme.palette.grey[200] }}
          >
            취소
          </Button>
          <Button
            onClick={() => {
              window.location.href = '/community';
            }}
            sx={{ color: theme.palette.common.black }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </ContentArea>
  );
}
const ProductBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center !important',
});

const ResponsiveContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  maxWidth: '500px',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  [theme.breakpoints.down(492)]: {
    maxWidth: '300px',
  },
}));

const SelectButton = styled(Button)({
  width: 96,
  padding: '0 12px',
  fontSize: '14px',
  height: '32px',
  borderRadius: '16px',
  marginRight: '8px',
  marginBottom: '8px',
});

// Color 표시 원 스타일 정의
const ColorCircle = styled(Box)<{ color: string }>(({ color }) => ({
  width: 15,
  height: 15,
  borderRadius: '50%',
  border: color === 'white' ? '1px solid black' : 'none',
  backgroundColor: color === 'wood' ? '#9A6322' : color,
  marginRight: '8px',
}));

const containedButtonStyles = {
  color: '#000000',
  border: '1px solid #5FF531',
  backgroundColor: '#5FF531', // 클릭 효과와 호버 효과를 일관성 있게 만들기 위해 변경

  '&:hover': {
    color: '#000000',
    backgroundColor: '#B7FF8B', // 클릭 효과와 호버 효과를 일관성 있게 만들기 위해 변경
    border: '1px solid #5FF531',
  },
};

const outlineButtonStyles = {
  border: '1px solid rgb(218, 221, 224)',
  color: '#2F3438',
  '&:hover': {
    color: '#5FF531',
    border: '1px solid #000000',
    backgroundColor: 'transparent',
  },
};

const ErrorMsg = styled(Typography)({
  margin: '0px',
  padding: '0px',
  fontSize: '12px',
});
