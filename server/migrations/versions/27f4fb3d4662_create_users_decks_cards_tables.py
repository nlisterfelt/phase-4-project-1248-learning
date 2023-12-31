"""create users, decks, cards tables

Revision ID: 27f4fb3d4662
Revises: c80f01b41d03
Create Date: 2023-12-11 13:32:50.848249

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '27f4fb3d4662'
down_revision = 'c80f01b41d03'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users'))
    )
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('front_title', sa.String(), nullable=False),
    sa.Column('front_description', sa.String(), nullable=True),
    sa.Column('front_image', sa.String(), nullable=True),
    sa.Column('back_title', sa.String(), nullable=True),
    sa.Column('back_description', sa.String(), nullable=True),
    sa.Column('back_image', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_cards_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_cards'))
    )
    op.create_table('decks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_decks_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_decks'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('decks')
    op.drop_table('cards')
    op.drop_table('users')
    # ### end Alembic commands ###
