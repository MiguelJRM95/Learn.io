import { ParsedUrlQuery } from 'querystring';

import { supabaseServerClient } from '@supabase/supabase-auth-helpers/nextjs';
import { GetServerSidePropsContext, NextApiRequest } from 'next';

import { supabase } from '../supabaseClient';

import { tables } from './tables';

/**
 * This file contains supabase select definition.
 * Primarily the ones used for server side as there are hooks for the client side.
 * However sometimes we want to fetch data outside of a component -
 * - where using hooks is not possible. Hence the differentiation
 *
 */

/**
 * Fetch users server side
 */
export const fetchProfile = (
  ctx: GetServerSidePropsContext<ParsedUrlQuery> | { req: NextApiRequest }
) => supabaseServerClient(ctx).from(tables.users).select();

/**
 * Fetch users client side
 */
export const fetchProfileClientSide = () => supabase.from(tables.users).select();
