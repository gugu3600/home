import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userRepository } from '../repositories/userRepository.js'
import { cookieConfig } from '../../config/cookie.js';
import { prisma } from '../../config/prisma.js';
import { userService } from '../services/userService.js';

const JWT_SECRET = process.env.JWT_SECRET

export const authController = {

  async register(req, res) {
    const user = res.locals?.user;
    if (!user) return res.status(400).json({ error: 'Validation failed' });

    try {

      const created_user = await userService.create(user);
      console.log("Register successfully");
      return res.status(201).json(created_user);
    } catch (error) {
      console.log("register failed");
      
      return res.status(500).json({ error: 'User creation failed' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await userRepository.findByEmail(email)
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const tokenPayload = {
        id: user.id,
        email: user.email,
        roleId: user.roleId
      }

      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' }
      )

      res.cookie('token', token, cookieConfig);

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      }

      return res.json(payload);
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  async me(req, res) {
    try {
      const user = await userRepository.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: req.cookies?.token
      }
      return res.json(payload);

    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  async logout(req, res) {
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' })
    res.json({ message: 'Logged out' })
  },
}
