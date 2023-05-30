import { useState } from 'react';
import { textCutter } from 'helpers/textCutter';
import { setNoticeToFavorite, getNoticeById } from 'api/notices';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import PawLoader from '../../../images/Loader.png';
import { useAuth } from 'hooks/useAuth';
import { ModalItem } from '../ModalNotice/ModalNotice';
import { ModalApproveAction } from 'components/ModalApproveAction/ModalApproveAction';
import { useNavigate } from 'react-router-dom';
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
  const [petsDetails, setPetsDetails] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNoticeFavorite, setIsNoticeFavorite] = useState(notice.isFavourite);
  const { isLoggedIn } = useAuth;
  const navigate = useNavigate();

  const handleModalClick = () => {
    try {
      (async () => {
        const response = await getNoticeById(id);
        setPetsDetails(response.data);
      })();
    } catch (error) {
      notify('error', 'Something went wrong');
    }
    setIsOpen(!isOpen);
  };

  const handleAddToFavorite = async () => {
    try {
      const response = await setNoticeToFavorite(notice._id);
      if (response.data.code === 200) {
        setIsNoticeFavorite(prevState => !prevState);
      }
    } catch (error) {
      notify(
        'warning',
        'You need to register to add this message to your favorites'
      );
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
      notify('info', 'Your notice has been deleted');
    } catch (error) {
      notify('error', 'Delete available only to owner');
    }
  };

  const handleAddPet = () => {
    if (!isLoggedIn) {
      notify('warning', 'To add a pet, you must be a registered user');
      return;
    }
    navigate('/add-pet');
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

  const label = () => {
    switch (category) {
      case 'sell':
        return 'sell';
      case 'lost-found':
        return 'lost/found';
      case 'for-free':
        return 'in good hands';
      default:
    }
  };

  const Svg = () => {
    return sex === 'female' ? SvgFemale : SvgMale;
  };

  let age = Math.round((Date.now() - Date.parse(date)) / 31557600000);
  const years = age >= 2 ? 'years' : 'year';

  return (
    <>
      {isOpen && (
        <Modal onClick={handleModalClick}>
          {Object.keys(petsDetails).length === 0 ? (
            <Loader loaderSrc={PawLoader} size={150} />
          ) : (
            <ModalItem
              onClick={handleModalClick}
              id={id}
              onFavoriteClick={handleAddToFavorite}
              isFavorite={isNoticeFavorite}
              petsDetails={petsDetails}
            />
          )}
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

          <BtnAddPetCircle onClick={handleAddPet} />
          <PetCategory text={`${label()}`} />
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
