import { Request, Response, NextFunction } from "express";

import { jwtAdapter } from "../../config/tokenJwt";
import { Usuario } from "../../data/sqlize/models/models";

export class AuthMiddlewere {
  static async validateJwtToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(404).json({
        error: "No token provided",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(500).json({
        error: "Invalid token",
      });
    }

    const token = authHeader.split(" ").at(1) || "";

    try {
      const payload = await jwtAdapter.validationToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });

      const user = await Usuario.findByPk(payload.id);
      if (!user)
        return res.status(401).json({ error: "Invalid token of user" });
      req.body.user = user;

      next();
    } catch (err) {
      return res.status(500).json({
        msg: "Invalid token",
        err,
      });
    }
  }
}
