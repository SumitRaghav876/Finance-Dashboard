import bcrypt from "bcryptjs";

const hashedPassword = (schema) => {
  if (!schema.path('password')) return;

  schema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
  });

  schema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
};

export default hashedPassword;