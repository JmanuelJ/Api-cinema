export const getErrorByCodeName = (codeName: string) => {
  if (codeName === 'CastError') {
    return {
      status: 404,
      message:
        'El tipo de dato no es valido para el identificador proporcionado',
    };
  }
};
