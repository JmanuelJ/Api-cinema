import { Request, Response, NextFunction } from 'express';
import { ReservationModel } from '../models/reservation.model';

export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservation = await ReservationModel.create(req.body);

    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

export const getReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservations = await ReservationModel.find()
      .sort({ createdAt: -1 })
      .lean();

    // res.status(200).json(reservations);
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

export const getReservationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const notFoundMessage = 'Reserva no encontrada';
  try {
    //const id = req.params.id;
    const reservation = await ReservationModel.findById(req.params.id).lean();

    if (reservation) {
      res.json(reservation);
      return; //EARLY RETURN
    }

    res.status(404).json({ message: notFoundMessage });
  } catch (error: any) {
    if (error?.name === 'CastError') {
      res.status(404).json({ message: notFoundMessage });
      return;
    }

    next(error);
  }
};

export const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const notFoundMessage = 'Reserva no encontrada';

  try {
    const reservationUpdated = await ReservationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    ).lean();
    if (reservationUpdated) {
      res.json(reservationUpdated);
      return;
    }

    res.status(404).json({ message: notFoundMessage });
  } catch (error) {
    next(error);
  }
};

export const deleteReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const notFoundMessage = 'Reserva no encontrada';

  try {
    const reservationDeleted = await ReservationModel.findByIdAndDelete(
      req.params.id
    ).lean();

    if (reservationDeleted) {
      res.status(204).json(reservationDeleted);
      return;
    }

    res.status(404).json({ message: notFoundMessage });
  } catch (error: any) {
    if (error?.name === 'CastError') {
      res.status(404).json({ message: notFoundMessage });
      return;
    }

    next(error);
  }
};
