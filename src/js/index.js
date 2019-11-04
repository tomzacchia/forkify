import axios from 'axios';
import Search from './models/Search';

const search = new Search('pizza');

search.getResults();
