import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import UIButton from 'components/UI/Button/Button';
import useApi from 'components/utils/useApi';
import Field from 'components/Form/Field/Field';
import schema from './schema';
import './Form.css';

const initialValue = {
  title: '',
  url: '',
  imageUrl: '',
  price: 0,
};

const PromotionForm = ({ id }) => {
  const history = useHistory();
  const [load, loadInfo] = useApi({
    url: `/promotions/${id}`,
    method: 'get',
  });

  const [save, saveInfo] = useApi({
    url: id ? `/promotions/${id}` : '/promotions',
    method: id ? 'put' : 'post',
    onCompleted: (response) => {
      if (!response.error) {
        history.push('/');
      }
    },
  });

  useEffect(() => {
    if (id) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function onSubmit(formValues) {
    save({
      data: formValues,
    });
  }

  const values = id ? loadInfo.data : initialValue;

  return (
    <div>
      <h1>Promo 💲how</h1>
      <h2>Nova Promoção</h2>
      {!values ? (
        <div>Carregando...</div>
      ) : (
        <Formik
          initialValues={values}
          onSubmit={onSubmit}
          validationSchema={schema}
          render={() => (
            <Form>
              {saveInfo.loading && <span>Salvando dados...</span>}
              <div className="promotion-form__group">
                <Field name="title" type="text" label="Título" />
              </div>
              <div className="promotion-form__group">
                <Field name="url" type="text" label="Link" />
              </div>
              <div className="promotion-form__group">
                <Field name="imageUrl" type="text" label="Imagem (URL)" />
              </div>
              <div className="promotion-form__group">
                <Field name="price" type="number" label="Preço" />
              </div>
              <div>
                <UIButton component="button" type="submit">
                  Salvar
                </UIButton>
              </div>
            </Form>
          )}
        />
      )}
    </div>
  );
};

export default PromotionForm;
