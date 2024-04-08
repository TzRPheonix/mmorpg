require('dotenv').config();
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const monsterModel = require('../models/monsterModel');
const { sendEmail } = require('../services/user');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Post Method for registering a new account
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà enregistré.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '168h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Post Method for adding a monster
router.post('/addMonster', async (req, res) => {
  const { monstername, monsterPV, monsterDMG } = req.body;
  try {
    const existingMonster = await monsterModel.findOne({ monstername });
    if (existingMonster) {
      return res.status(400).json({ message: 'Monstre déjà enregistré.' });
    }

    const newMonster = new monsterModel({
      monstername,
      monsterPV,
      monsterDMG
    });

    const savedMonster = await newMonster.save();

    res.status(200).json({ message: 'Monstre ajouté.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all method for monster
router.get('/getAllMonster', async (req, res) => {
  try {
      const data = await monsterModel.find();
      res.json(data)
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
})


// Get all method for account
router.get('/getAll', async (req, res) => {
    try {
        const data = await userModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Post method for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Utilisateur introuvable.' });
      }
      console.log('user.password:', user.password);
      console.log('password:', password);
      const match = await bcrypt.compare(password, user.password);
      console.log(match)
      if (match) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '168h' });
        return res.status(200).json({ message: 'Authentification réussie.', token});
      } else {
        return res.status(400).json({ message: 'Authentification échouée.' });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
});
  
//Password Reset Request Method
router.post('/reset-password', async (req, res) => {
  try {
      const email = req.body.email;
      const user = await userModel.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Utilisateur non existant' });
      }
      // Generate a password reset token and store it in the user object
      const token = crypto.randomBytes(20).toString('hex');
      user.resetToken = token;
      user.resetTokenExpires = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();
      // Send the password reset email with the reset link
      const resetLink = `https://example.com/reset-password/${token}`;
      const emailBody = `Cliquer sur ce lien pour réinitialiser votre mot de passe : <a href="${resetLink}">${resetLink}</a><br><br>Si vous n'êtes pas à l'origine de ce changement, modifier immédiatement votre mot de passe.`;
      await sendEmail(email, 'Modification de votre mot de passe.', emailBody);
      res.status(200).json({ message: 'Lien de réinitialisation envoyé.' });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
})

//Password Reset Link Method
router.patch('/reset-password/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const user = await userModel.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'Token invalide ou expiré.' });
    }
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'Mot de passe requis.' });
    }
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
    res.status(200).json({ message: 'Mot de passe changé.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;