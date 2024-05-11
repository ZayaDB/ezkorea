import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFetchData } from '../hooks/useFetchData';
import { useFileHandler } from '../hooks/community/useFileHandler';
import { useProductHandler } from '../hooks/community/useProductHandler';
import { useSelectionHandler } from '../hooks/community/useSelectionHandler';
import { FeedData, SelectedProducts } from '../types/communityTypes';
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
      console.log(data);
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

  // 파일 업로드 인풋 트리거
  const triggerFileInput = () => {
    // ref를 사용하여 실제 input 요소를 트리거합니다
    fileInputRef.current?.click();
  };

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
    console.log(imageUrl.length < 1, !files.length);
    if (imageUrl.length < 1 && !files.length) {
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
    if (
      selectedConcepts.length &&
      selectedColors.length &&
      (files.length || imageUrl.length > 0)
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
                    style={{ width: '100px', height: '100px' }}
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
                    // onClick={() => handleRemoveFile(index)}
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
              placeholder='제품명 입력'
              onKeyDown={handleKeyPress}
              variant='outlined'
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
                onClick={() => toggleConcept(concept)}
                sx={{
                  bgcolor: selectedConcepts.includes(concept)
                    ? 'primary.main'
                    : 'inherit',
                }}
                variant='outlined'
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
                onClick={() => toggleColor(color)}
                sx={{
                  bgcolor: selectedColors.includes(color)
                    ? 'primary.main'
                    : 'inherit',
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
            <Typography>제목:</Typography>
            <Typography>{formData?.title}</Typography>
            <br />
            <Typography>설명:</Typography>
            <Typography>{formData?.description}</Typography>
            <br />
            {formData?.products && formData?.products.length > 0 ? (
              formData?.products.length > 1 ? (
                <Typography>
                  {' '}
                  제품명: {formData?.products.join(', ')}{' '}
                </Typography>
              ) : (
                <Typography> 제품명: {formData?.products[0]} </Typography>
              )
            ) : (
              ''
            )}
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
