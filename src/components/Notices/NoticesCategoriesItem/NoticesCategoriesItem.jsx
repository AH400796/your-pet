import { useState } from 'react';
import { textCutter } from 'helpers/textCutter';
import { setNoticeToFavorite } from 'api/notices';
import { Modal } from 'components/Modal/Modal';
import { ModalItem } from '../ModalNotice/ModalNotice';
import { ModalApproveAction } from 'components/ModalApproveAction/ModalApproveAction';
import { DeletePetBtn, PetInfo } from 'components/buttons/buttons';
import { notify } from 'helpers/notification';
import {
  BtnAddFavorite,
  BtnAddPetCircle,
  BtnLearnMoreFavorite,
  PetCategory,
  SvgClock,
  SvgFemale,
  SvgLocation,
  SvgMale,
} from 'components/buttons/buttons';
import {
  DeleteBtnWrapper,
  ContainerCard,
  ContainerInfo,
  Img,
  Text,
} from './NoticesCategoriesItem.styled';

export const NoticesCategoryItem = ({ notice, delNotice }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNoticeFavorite, setIsNoticeFavorite] = useState(notice.isFavourite);

  const handleModalClick = () => {
    setIsOpen(!isOpen);
  };

  const handleAddToFavorite = async () => {
    try {
      const response = await setNoticeToFavorite(notice._id);
      if (response.data.code === 200) {
        setIsNoticeFavorite(prevState => !prevState);
      }
      if (!response.data.code === 200) {
        notify(
          'error',
          'Adding to favorites available only to authorized users'
        );
      }
    } catch (error) {
      notify('error', 'Adding to favorites available only to authorized users');
    }
  };

  const handleDeleteNotice = () => {
    setIsDelete(true);
  };

  const handleDeleteCancel = () => {
    setIsDelete(false);
  };

  const handleDeleteYes = async () => {
    try {
      delNotice(id);
      setIsDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    isOwner,
    imgUrl,
    sex,
    location,
    category,
    _id: id,
    title,
    date,
  } = notice;

  const Svg = () => {
    return sex === 'female' ? SvgFemale : SvgMale;
  };

  let age = Math.round((Date.now() - Date.parse(date)) / 31557600000);
  const years = age >= 2 ? 'years' : 'year';

  return (
    <>
      {isOpen && (
        <Modal onClick={handleModalClick}>
          <ModalItem
            onClick={handleModalClick}
            id={id}
            onFavoriteClick={handleAddToFavorite}
            isFavorite={isNoticeFavorite}
          />
        </Modal>
      )}
      <ContainerCard>
        <>
          <Img src={imgUrl} alt="Pet image" />
          <BtnAddFavorite
            onClick={handleAddToFavorite}
            isFavorite={isNoticeFavorite}
          />
          {isOwner && (
            <DeleteBtnWrapper>
              <DeletePetBtn onClick={handleDeleteNotice} />
            </DeleteBtnWrapper>
          )}

          <BtnAddPetCircle />
          <PetCategory text={`${category}`} />
          <ContainerInfo>
            <PetInfo Svg={SvgLocation} text={`${textCutter(location, 4)}`} />
            <PetInfo Svg={SvgClock} text={`${age} ${years}`} />
            <PetInfo Svg={Svg()} text={`${sex}`} />
          </ContainerInfo>
          <Text>{title}</Text>
        </>

        <BtnLearnMoreFavorite id={id} onClick={handleModalClick} />
      </ContainerCard>
      {isDelete && (
        <ModalApproveAction
          onActivate={handleDeleteYes}
          onClick={handleDeleteCancel}
          variant={'deleteAds'}
          text={title}
        />
      )}
    </>
  );
};
